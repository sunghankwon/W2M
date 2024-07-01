import { marked } from "marked";

const getMarkdownRenderer = () => {
  const renderer = new marked.Renderer();

  renderer.image = function (href, title, text) {
    const isHttpUrl = href.startsWith("http://") || href.startsWith("https://");
    const isBase64Url = href.startsWith("data:image/");

    if (isHttpUrl || isBase64Url) {
      return `<img src="${href}" alt="${text}" title="${title}" class="max-w-[96%] h-auto block mx-auto">`;
    } else {
      return `
        <div class="image-container text-center">
          <img src="${href}" alt="${text}" title="${title}" class="max-w-[96%] h-auto block mx-auto">
          <div class="text-xs text-gray-600">프리뷰를 위해 표시된 이미지입니다.</div>
        </div>
      `;
    }
  };

  marked.setOptions({
    renderer,
    breaks: true,
  });

  return renderer;
};

export default getMarkdownRenderer;
