import { FormatDate, NowEnd, NowStart, VARIABLES_DATE } from '../mock/global';

const getInitials = (name: string) => {
  let nameArray = name.split(' ');
  let initials = '';

  for (let i = 0; i < nameArray.length && i < 2; i++) {
    initials += nameArray[i].charAt(0).toUpperCase();
  }

  return initials;
};

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

function convertToRupiah(nominal: number) {
  return idrFormatter.format(nominal);
}

const getVariableDate = (variant: string = 'NOW') => {
  return VARIABLES_DATE[variant];
};

const getVariableChartTransction = () => {
  return {
    one_start: NowStart.subtract(6, 'day').format(FormatDate),
    one_end: NowEnd.subtract(6, 'day').format(FormatDate),
    two_start: NowStart.subtract(5, 'day').format(FormatDate),
    two_end: NowEnd.subtract(5, 'day').format(FormatDate),
    three_start: NowStart.subtract(4, 'day').format(FormatDate),
    three_end: NowEnd.subtract(4, 'day').format(FormatDate),
    four_start: NowStart.subtract(3, 'day').format(FormatDate),
    four_end: NowEnd.subtract(3, 'day').format(FormatDate),
    five_start: NowStart.subtract(2, 'day').format(FormatDate),
    five_end: NowEnd.subtract(2, 'day').format(FormatDate),
    six_start: NowStart.subtract(1, 'day').format(FormatDate),
    six_end: NowEnd.subtract(1, 'day').format(FormatDate),
    seven_start: NowStart.format(FormatDate),
    seven_end: NowEnd.format(FormatDate),
  };
};

interface Variants {
  name?: string;
  values: string[];
}

const getVariants = (variants: Variants[], coord: number[]) => {
  const variant1 = variants?.[0]?.values?.[coord?.[0] || 0];
  const variant2 = variants?.[1]?.values?.[coord?.[1] || 0];
  const variant = [variant1, variant2].filter((v) => v);

  return variant;
};

const getNominals = (totalTagihan: number): number[] => {
  const nominal = [10000, 20000, 50000, 100000];
  let result = [totalTagihan];
  let i = 0;

  while (i < nominal.length && result.length < 3) {
    const sisa = nominal[i] - (totalTagihan % nominal[i]);

    if (sisa !== nominal[i] && !result.includes(totalTagihan + sisa)) {
      result.push(totalTagihan + sisa);
    }

    i++;
  }

  if (result.length === 1) {
    return result;
  }

  return result.slice(0, 3);
};

const getPrices = (max: number | undefined, min: number | undefined) => {
  const pricesMax = convertToRupiah(max || 0);
  const pricesMin = convertToRupiah(min || 0);
  const arr = [pricesMin, pricesMax];

  const prices = arr?.filter((value, index) => arr.indexOf(value) === index).join(' - ');

  return prices;
};

const simplifyFraction = (numerator: number = 0, denominator: number = 0) => {
  // Find the greatest common divisor using Euclid's algorithm
  const gcd: any = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));
  const commonDivisor = gcd(numerator, denominator);

  // Divide the numerator and denominator by the common divisor
  const simplifiedNumerator = numerator / commonDivisor;
  const simplifiedDenominator = denominator / commonDivisor;

  // Return the simplified fraction as an array [numerator, denominator]
  return [simplifiedNumerator, simplifiedDenominator];
};

const getPreviousDays = (): string[] => {
  const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const today = new Date();
  const previousDays: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - i);
    const dayOfWeekIndex = previousDay.getDay();
    previousDays.push(daysOfWeek[dayOfWeekIndex]);
  }

  return previousDays;
};

export {
  getInitials,
  convertToRupiah,
  getVariants,
  getNominals,
  getPrices,
  getVariableDate,
  simplifyFraction,
  getPreviousDays,
  getVariableChartTransction,
};
