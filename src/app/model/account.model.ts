export interface AccountDetails {
  accountId:           string;
  balance:             number;
  currentPage:         number;
  pageSize:            number;
  totalPages:          number;
  accountOperationDTO: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  amount:        number;
  type:          string;
  description:   string;
  operationDate: Date;
}
