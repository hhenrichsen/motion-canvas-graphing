import {afterAll, beforeAll, describe, expect, test} from 'vitest';
import {App, start} from './app';

describe('Rendering', () => {
  let app: App;

  beforeAll(async () => {
    app = await start();
  });

  afterAll(async () => {
    await app.stop();
  });

  test(
    'Animation renders correctly',
    async () => {
      const [rendering] = await app.page.$x(
        "//div[contains(text(), 'Rendering')]",
      );
      if (rendering) {
        const tab = await app.page.evaluateHandle(
          el => el.parentElement,
          rendering,
        );
        await tab.click();
      }
      await new Promise(resolve => setTimeout(resolve, 1_000));

      const [frameRateLabel] = await app.page.$x(
        "//div[contains(text(), 'Rendering')]/parent::div//label[contains(text(), 'frame rate')]/parent::div//input",
      );
      expect(frameRateLabel).toBeDefined();
      const frameRate = await app.page.evaluateHandle(
        el => el.nextSibling.firstChild,
        frameRateLabel,
      );
      await new Promise(resolve => setTimeout(resolve, 1_000));

      await frameRate.type('15');

      const [scaleLabel] = await app.page.$x(
        "//div[contains(text(), 'Rendering')]/parent::div//label[contains(text(), 'scale')]",
      );
      expect(scaleLabel).toBeDefined();
      const scale = await app.page.evaluateHandle(
        el => el.parentElement.children[1],
        scaleLabel,
      );

      await scale.select('1');

      await app.page.click('#render');
      await app.page.waitForSelector('#render:not([data-rendering="true"])', {
        timeout: 2 * 60 * 1000,
      });

      expect(true).toBe(true);
    },
    {
      timeout: 2 * 60 * 1000,
    },
  );
});
