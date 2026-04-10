export function getSiteHeaderElement(from?: HTMLElement | null) {
  if (from?.closest) {
    const closestHeader = from.closest<HTMLElement>("[data-site-header]");
    if (closestHeader) return closestHeader;
  }

  return document.querySelector<HTMLElement>("[data-site-header]");
}

export function getHeaderMainbarElement(from?: HTMLElement | null) {
  const header = getSiteHeaderElement(from);
  return (
    header?.querySelector<HTMLElement>("[data-header-mainbar]") ??
    document.querySelector<HTMLElement>("[data-header-mainbar]")
  );
}

export function measureHeaderBottom(from?: HTMLElement | null) {
  return getSiteHeaderElement(from)?.getBoundingClientRect().bottom ?? 0;
}

export function measureMainbarBottom(from?: HTMLElement | null) {
  return getHeaderMainbarElement(from)?.getBoundingClientRect().bottom ?? measureHeaderBottom(from);
}

export function lockViewportScroll() {
  const root = document.documentElement;
  const body = document.body;
  const previous = {
    rootOverflow: root.style.overflow,
    rootOverscrollBehavior: root.style.overscrollBehavior,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
    bodyTouchAction: body.style.touchAction,
  };
  const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);

  root.style.overflow = "hidden";
  root.style.overscrollBehavior = "none";
  body.style.overflow = "hidden";
  body.style.touchAction = "none";

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    root.style.overflow = previous.rootOverflow;
    root.style.overscrollBehavior = previous.rootOverscrollBehavior;
    body.style.overflow = previous.bodyOverflow;
    body.style.paddingRight = previous.bodyPaddingRight;
    body.style.touchAction = previous.bodyTouchAction;
  };
}
