import { Plugin } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import * as path from 'path'

const svgPlugin: Plugin = createSvgIconsPlugin({
  // 指定需要缓存的图标文件夹
  iconDirs: [path.resolve(process.cwd(), 'src/layout/nav/icon')],
  // 指定symbolId格式
  symbolId: 'icon-[dir]-[name]',

  /**
   * 自定义插入位置
   * @default: body-last
   */
  // inject?: 'body-last' | 'body-first',

  /**F
   * custom dom id
   * @default: __svg__icons__dom__
   */
  // customDomId: '__svg__icons__dom__',
})
export default svgPlugin