package result

type SuccessResult struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

type ErrorResult struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}
