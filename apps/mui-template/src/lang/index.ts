import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import entranslation from './en.json';
import zhcntranslation from './zh_cn.json';

export const resources: Resource = {
  en: {
    translation: entranslation,
    icon: "/icon/gb.png"
  },
  'zh_cn': {
    translation: zhcntranslation,
    icon: "/icon/cn.png"
  }
};

i18next.use(initReactI18next).init({
  lng: 'zh_cn', // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
