import assert from 'node:assert/strict';
import test from 'node:test';
import JSZip from 'jszip';
import { evaluatePptxSpec } from '../src/utils/specEvaluator.ts';

test('checks prompt requirements against text extracted from PPTX', async () => {
  const prompt = '3枚のスライド。表紙あり。キーワード: 光合成, 細胞';
  const good = new JSZip();
  ['光合成の基礎', '細胞の構造', '光合成と&amp;細胞の応用']
    .forEach((text, index) => {
      good.file(
        `ppt/slides/slide${index + 1}.xml`,
        `<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:t>${text}</a:t></p:sld>`
      );
    });
  const goodResult = await evaluatePptxSpec(
    prompt,
    await good.generateAsync({ type: 'uint8array' })
  );
  assert.equal(goodResult.passed, true);
  assert.deepEqual(goodResult.slideCount, { expected: 3, actual: 3, ok: true });
  assert.equal(goodResult.cover.ok, true);
  assert.deepEqual(goodResult.keywords.found, ['光合成', '細胞']);

  const bad = new JSZip();
  ['アジェンダ', '細胞の構造']
    .forEach((text, index) => {
      bad.file(
        `ppt/slides/slide${index + 1}.xml`,
        `<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:t>${text}</a:t></p:sld>`
      );
    });
  const badResult = await evaluatePptxSpec(
    prompt,
    await bad.generateAsync({ type: 'uint8array' })
  );
  assert.equal(badResult.passed, false);
  assert.equal(badResult.slideCount.ok, false);
  assert.equal(badResult.cover.ok, false);
  assert.deepEqual(badResult.keywords.missing, ['光合成']);
});
