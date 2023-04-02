/**
 * 静默打印
 * @date 2023/4/2 - 14:36:20
 *
 * @export
 * @param {string} content 需要打印的内容
 */
export function silentPrint(content: string) {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  try {
    var printContent: any = iframe.contentWindow?.document;
    printContent.head.innerHTML = document.head.outerHTML;
    printContent.body.innerHTML = content;
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    document.body.removeChild(iframe);
  } catch (e) {
    console.warn("打印异常", e);
  }
}
