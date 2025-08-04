export interface Form {
  id: string;
  title: string;
  type: string;
  reward: number;
  image: string;
}

export interface UserData {
  balance: number;
  completedForms: number;
  salary: number;
  totalFormsValue: number;
}
