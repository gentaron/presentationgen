import JSZip from 'jszip';

export interface SpecEvaluation {
  passed: boolean;
  slideCount: { expected: number | null; actual: number; ok: boolean };
  cover: { required: boolean; ok: boolean };
  keywords: { expected: string[]; found: string[]; missing: string[]; ok: boolean };
}

export async function evaluatePptxSpec(
  prompt: string,
  pptx: Uint8Array | ArrayBuffer
): Promise<SpecEvaluation> {
  const zip = await JSZip.loadAsync(pptx);
  const slideEntries = Object.keys(zip.files)
    .map((path) => /^ppt\/slides\/slide(\d+)\.xml$/.exec(path))
    .filter((entry): entry is RegExpExecArray => entry !== null)
    .sort((a, b) => Number(a[1]) - Number(b[1]));

  const slideTexts = await Promise.all(
    slideEntries.map(async (entry) => {
      const xml = await zip.file(entry[0])!.async('string');
      return [...xml.matchAll(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g)]
        .map((match) => match[1]
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&amp;/g, '&'))
        .join(' ');
    })
  );

  const countMatch = prompt.match(/(?:(\d+)\s*(?:枚|ページ|slides?)|slides?\s*[:：]?\s*(\d+))/i);
  const expectedCount = Number(countMatch?.[1] ?? countMatch?.[2]) || null;
  const coverRequired = !/表紙(?:なし|不要)|no\s+cover/i.test(prompt) &&
    /表紙|カバー|タイトルスライド|cover(?:\s*slide)?|title\s*slide/i.test(prompt);
  const keywordSource = prompt.match(/(?:キーワード|keywords?)\s*[:：]?\s*([^\n。.;；]+)/i)?.[1] ?? '';
  const keywords = [...new Set(keywordSource.split(/[,、，;；\s]+/).map((word) => word.trim()).filter(Boolean))];
  const normalizedTexts = slideTexts.map((text) => text.toLocaleLowerCase().replace(/\s+/g, ''));
  const normalizedFirst = normalizedTexts[0] ?? '';
  const found = keywords.filter((word) => {
    const needle = word.toLocaleLowerCase().replace(/\s+/g, '');
    return needle.length > 0 && normalizedTexts.some((text) => text.includes(needle));
  });
  const missing = keywords.filter((word) => !found.includes(word));
  const coverOk = !coverRequired || (
    normalizedFirst.length > 0 && (
      keywords.length === 0 ||
      keywords.some((word) => normalizedFirst.includes(word.toLocaleLowerCase().replace(/\s+/g, ''))) ||
      /表紙|カバー|cover|title/i.test(slideTexts[0] ?? '')
    )
  );
  const countOk = expectedCount === null || expectedCount === slideTexts.length;

  return {
    passed: countOk && coverOk && missing.length === 0,
    slideCount: { expected: expectedCount, actual: slideTexts.length, ok: countOk },
    cover: { required: coverRequired, ok: coverOk },
    keywords: { expected: keywords, found, missing, ok: missing.length === 0 },
  };
}
