export interface IUser {
  vin: string,
  cur_number: string,
  fio: string
}

export interface IWork {
  id: number,
  work: string,
  amount: number,
  count: number
}

export interface Work {
  amount: string;
}

export interface UserData {
  date: string;
  works: Work[];
}

export interface IStatistic {
  data: UserData[];
}
