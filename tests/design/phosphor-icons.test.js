// Verify the shadcn preset's Phosphor icons while preserving the existing
// renderer API and Lucide fallback for icons not yet migrated.
describe('Parachord preset icons', () => {
  const originalReact = global.React;
  const originalLucide = global.lucideReact;

  beforeEach(() => {
    jest.resetModules();
    global.React = {
      createElement: (type, props, ...children) => ({ type, props, children }),
    };
    global.lucideReact = { CircleHelp: () => 'legacy-icon' };
  });

  afterEach(() => {
    global.React = originalReact;
    global.lucideReact = originalLucide;
  });

  test('renders playback controls as the official 256px Phosphor vectors', () => {
    const Icons = require('../../src/renderer/components/icons');
    for (const name of ['Play', 'Pause', 'SkipForward', 'SkipBack', 'Heart', 'List']) {
      const rendered = Icons[name]({ size: 20, className: 'test-icon' });
      expect(rendered.type).toBe('svg');
      expect(rendered.props.viewBox).toBe('0 0 256 256');
      expect(rendered.props.width).toBe(20);
      expect(rendered.props.height).toBe(20);
      expect(rendered.props.className).toBe('test-icon');
      expect(rendered.children[0].type).toBe('path');
      expect(rendered.children[0].props.d.length).toBeGreaterThan(16);
    }
  });

  test('retains existing React icon props and leaves additional icons available', () => {
    const Icons = require('../../src/renderer/components/icons');
    const play = Icons.Play({ size: 28, color: 'tomato', 'aria-label': 'Play' });
    expect(play.props.color).toBe('tomato');
    expect(play.props['aria-label']).toBe('Play');
    expect(typeof Icons.CircleHelp).toBe('function');
  });
});
