/**
 * @description 文件下载-替换window.location.href时使用
 * @description 可用 URL.createObjectURL 为Blod对象创建链接
 * @param href 全链接
 * @param filename 文件名称
 */
export const downLoadByURL = (href: string, filename: string) => {
  let link = document.createElement("a");
  let body = document.querySelector("body");

  link.href = href;
  link.download = filename;

  link.style.display = "none";
  body?.appendChild(link);

  link.click();
  body?.removeChild(link);
};

