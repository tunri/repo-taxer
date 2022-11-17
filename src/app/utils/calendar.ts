import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export type IDateJson = {
	year: number;
	month: number;
	day: number;
};

export const parseStringDate = ({ year, month, day }: IDateJson): string => {
	const _day = getNumberWithZero(day);
	const _month = getNumberWithZero(month);
	return `${year}-${_month}-${_day}`;
};

// Todo: Mejorar con Pad
// ("0" + date.day).slice(-2),
export const getNumberWithZero = (n: number) => {
	return n < 10 && n.toString().length === 1 ? `0${n}` : n;
};

/**
 *
 * @param strDate formato fecha, yyyy-mm-dd
 * @returns
 */
export const toNgDateStruct = (strDate: string): NgbDateStruct => {
	const [year, month, day] = strDate.split('-');
	return {
		year: Number(year),
		month: Number(month),
		day: Number(day),
	};
};
