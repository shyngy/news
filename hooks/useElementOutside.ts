import React from 'react';

type AddEventListener = Event & {
  path: Node[];
  target: HTMLElement;
};

export function useElementOutside(buttonId: string, outElementId: string) {
  const [clicked, setClicked] = React.useState(false);
  const minRows = clicked ? 5 : 1;
  React.useEffect(() => {
    // чтобы скрывать и открывать элемент лучше использовать onBlur и onFocus
    // я сделала через window
    if (typeof window === 'undefined') return;
    window.addEventListener('click', onEventListener);
    return () => {
      if (typeof window === 'undefined') return;
      window.removeEventListener('click', onEventListener);
    };
  }, []);
  const onEventListener = (event: AddEventListener) => {
    const path = event.path || (event.composedPath && event.composedPath());
    const isButton = path.some((item: HTMLElement) => item.id === buttonId);
    if (isButton) return;
    const isInput = path.some((item: HTMLElement) => item.id === outElementId);
    setClicked(isInput);
  };
  return { clicked, setClicked, minRows };
}
