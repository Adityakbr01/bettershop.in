'use client';

import { useRouter } from 'next/navigation';

type NavigateOptions = {
  query?: Record<string, string>;
  delay?: number;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean; // Reserved for future use
  onBeforeNavigate?: () => void;
  onAfterNavigate?: () => void;
};

function buildUrl(path: string, query?: Record<string, string>) {
  if (!query) return path;

  const searchParams = new URLSearchParams(query);
  return `${path}?${searchParams.toString()}`;
}

export function useNavigate() {
  const router = useRouter();

  const goTo = (
    path: string,
    options: NavigateOptions = {}
  ) => {
    const {
      query,
      delay = 0,
      replace = false,
      onBeforeNavigate,
      onAfterNavigate,
    } = options;

    const url = buildUrl(path, query);

    onBeforeNavigate?.();

    if (delay > 0) {
      setTimeout(() => {
        replace ? router.replace(url) : router.push(url);
        onAfterNavigate?.();
      }, delay);
    } else {
      replace ? router.replace(url) : router.push(url);
      onAfterNavigate?.();
    }
  };

  const back = () => {
    router.back();
  };

  return { goTo, back };
}
