import antdKo from 'antd/lib/locale-provider/ko_KR';
import appLocaleData from 'react-intl/locale-data/ko';
import koMessages from './ko_KR.json';

const KoLang = {
  messages: {
    ...koMessages,
  },
  antd: antdKo,
  locale: 'ko-KR',
  data: appLocaleData
};
export default KoLang;
