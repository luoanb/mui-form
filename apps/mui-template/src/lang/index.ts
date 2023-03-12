import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import entranslation from './en.json';
import zhcntranslation from './zh_cn.json';

const getImgUrl = (name: string) => {
  return new URL(`./icon/${name}.png`, import.meta.url).href 
};

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
