package entities

type Dictionary struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
	Type int64 `json:"type" db:"type"`
	Descrpition string `json:"descrpition" db:"descrpition"`
	ExtendedField string `json:"extendedfield" db:"extendedfield"`
	PrimaryKey string `json:"pKey" db:"pKey"`
}