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
  const header = getSiteHeaderElement();
  const scrollY = window.scrollY;
  const previous = {
    rootOverflow: root.style.overflow,
    rootOverscrollBehavior: root.style.overscrollBehavior,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
    bodyTouchAction: body.style.touchAction,
    headerPosition: header?.style.position ?? "",
    headerTop: header?.style.top ?? "",
    headerLeft: header?.style.left ?? "",
    headerRight: header?.style.right ?? "",
    headerWidth: header?.style.width ?? "",
  };
  const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);

  root.style.overflow = "hidden";
  root.style.overscrollBehavior = "none";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
  body.style.touchAction = "none";

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  if (header) {
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.width = "100%";
  }

  return () => {
    root.style.overflow = previous.rootOverflow;
    root.style.overscrollBehavior = previous.rootOverscrollBehavior;
    body.style.position = previous.bodyPosition;
    body.style.top = previous.bodyTop;
    body.style.left = previous.bodyLeft;
    body.style.right = previous.bodyRight;
    body.style.width = previous.bodyWidth;
    body.style.overflow = previous.bodyOverflow;
    body.style.paddingRight = previous.bodyPaddingRight;
    body.style.touchAction = previous.bodyTouchAction;
    if (header) {
      header.style.position = previous.headerPosition;
      header.style.top = previous.headerTop;
      header.style.left = previous.headerLeft;
      header.style.right = previous.headerRight;
      header.style.width = previous.headerWidth;
    }
    window.scrollTo(0, scrollY);
  };
}
