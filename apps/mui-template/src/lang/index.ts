import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import entranslation from './en.json';
import zhcntranslation from './zh_cn.json';

function getAssetUrl(url: string) {
  return new URL(url, import.meta.url).href
}
const getImgUrl = (name: string) => getAssetUrl(`./icon/${name}.png`);

export const resources: Resource = {
  en: {
    translation: entranslation,
    icon: getImgUrl("gb")
  },
  'zh_cn': {
    translation: zhcntranslation,
    icon: getImgUrl("cn")
  }
};

i18next.use(initReactI18next).init({
  lng: 'zh_cn', // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
