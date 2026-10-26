const fs = require('fs');
const path = require('path');

describe('offline shadcn preset assets', () => {
  const root = path.resolve(__dirname, '../..');
  const css = fs.readFileSync(path.join(root, 'design-system/shadcn-theme.css'), 'utf8');
  const theme = JSON.parse(fs.readFileSync(path.join(root, 'design-system/shadcn-theme.json'), 'utf8'));

  test('retains the selected semantic palette and purple charts', () => {
    expect(theme.presetCode).toBe('b6W2kHjuVs');
    expect(theme.cssVars.light.primary).toBe('oklch(0.205 0 0)');
    expect(theme.cssVars.dark.primary).toBe('oklch(0.922 0 0)');
    expect(theme.cssVars.light['chart-1']).toBe('oklch(0.827 0.119 306.383)');
    expect(css).toContain(':root.dark, .dark {');
  });

  test.each(['dm_sans_variable.ttf', 'space_grotesk_variable.ttf'])(
    '%s is shipped locally as a valid TrueType font',
    (fileName) => {
      const binary = fs.readFileSync(path.join(root, 'assets/fonts', fileName));
      expect(binary.length).toBeGreaterThan(100000);
      // TrueType fonts start with the 0x00010000 sfnt version.
      expect(binary.subarray(0, 4).toString('hex')).toBe('00010000');
      expect(css).toContain(fileName);
    }
  );

  test('declares preset typography for the desktop renderer', () => {
    expect(css).toContain("font-family: 'DM Sans'");
    expect(css).toContain("font-family: 'Space Grotesk'");
    expect(css).toContain("body, button, input, select, textarea");
  });
});
