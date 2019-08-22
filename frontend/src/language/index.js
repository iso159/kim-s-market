import Kolang from './ko_KR';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  ko: Kolang
};
addLocaleData(AppLocale.ko.data);

export default AppLocale;
