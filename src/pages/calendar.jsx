import React, { useState } from "react";
import styled from "styled-components";

export const Calendar = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const years = ["2025", "2026", "2027", "2028", "2029", "2030"];
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const customHours = {
    Dom: "8:45",
    Seg: "16:00",
    Ter: "8:30",
    TerNoite: "18:45",
    Qua: "8:30",
    QuaNoite: "18:45",
    Qui: "8:30",
    QuiNoite: "18:45",
    Sex: "8:30",
    Sáb: "8:45",
  };

  const customLocal = {
    Dom: "Grupos",
    Seg: "Edilena",
    Ter: "Edilena",
    TerNoite: "Regina",
    Qua: "Meire",
    QuaNoite: "Felipe",
    Qui: "Meire",
    QuiNoite: "",
    Sex: "Meire",
    Sáb: "Luis Costa",
  };

  const customDriver = {
    Dom: "Sup. do Grupo",
    Seg: "Mauricio Roncari",
    Ter: "",
    TerNoite: "Pablo",
    Qua: "Renato",
    QuaNoite: "Felipe",
    Qui: "Reinaldo",
    QuiNoite: "Felipe",
    Sex: "Mauricio Roncari",
    Sáb: "",
  };

  const customAnnotations = {
    data: "29/03",

    localPrimario: "Meire",
    dirigentePrimario: "Davi",
    gruposPrimario: "Deivid, Mário e Davi",

    localSecundario: "Regina",
    dirigenteSecundario: "Silas",
    gruposSecundario: "Fernando e Silas",

    visitaSsGrupo: "Deivid",
    visitaSsData: "01/03",

    campanhas: "",
  }

  const driverSaturday = ["Fabiano", "Adeir", "Felipe", "Fernando", "Davi", "Silas", "Luis Costa", "Mário", "Visita", "Congresso", "Assembléia"]

  const driverTuesday = ["Cidinha", "Terezinha", "Edilena", "Rosemeire"]

  return (
    <Body>
      <Container>
        <Controls>
          <h1>Calendário de Serviço</h1>
          
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </Select>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Controls>
        <Annotations>
          <p>
            <strong>{customAnnotations.data}:</strong>  &nbsp; Campo Rural com duas saídas
          </p>
          <p>
            <strong>Local: </strong>{customAnnotations.localPrimario} &nbsp; &nbsp; &nbsp; &nbsp; 
            <strong>Dirigente: </strong>{customAnnotations.dirigentePrimario} &nbsp; &nbsp; &nbsp;
            <strong>Grupos: </strong>{customAnnotations.gruposPrimario}
          </p>
          <p>
            <strong>Local: </strong>{customAnnotations.localSecundario} &nbsp; &nbsp; &nbsp; 
            <strong>Dirigente: </strong>{customAnnotations.dirigenteSecundario} &nbsp; &nbsp; &nbsp; &nbsp; 
            <strong>Grupos: </strong>{customAnnotations.gruposSecundario}
          </p>
          {/* <p>
            <strong>Visita do Superintendente de Serviço:</strong> &nbsp; &nbsp; &nbsp; 
            <strong>Grupo:</strong> {customAnnotations.visitaSsGrupo} &nbsp; &nbsp; &nbsp; 
            <strong>Data:</strong> {customAnnotations.visitaSsData}
          </p> */}
          {/* Campanhas especiais */}
          {/* <p>
            <strong>Campanha da Celebração: </strong> Início no sábado, 15 de março.
          </p> */}
        </Annotations>
        <CalendarContainer>
          <Grid>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <Day key={day}>{day}</Day>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i}></div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const weekDay = new Date(selectedYear, selectedMonth, i + 1).getDay();
              const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb",];
              return (
                <DayBox key={i}> <span>{i + 1}</span>
                  <p><strong>{customHours[dayNames[weekDay]] || ""}</strong></p>
                  <p><strong>Local: </strong>{customLocal[dayNames[weekDay]] || ""}</p>
                  <p><strong>Dirigente:</strong></p>
                  <p>{customDriver[dayNames[weekDay]] || ""}</p>
                  {(dayNames[weekDay] === "Ter" || "") && (
                    <>
                        <SelectTuesday>
                            {driverTuesday.map((driver) => (
                              <option key={driver} value={driver}>{driver}</option>
                            ))}
                        </SelectTuesday>
                    </>
                  )}
                  {(dayNames[weekDay] === "Sáb") && (
                    <>
                        <SelectSaturday>
                            {driverSaturday.map((driver) => (
                              <option key={driver} value={driver}>{driver}</option>
                            ))}
                        </SelectSaturday>
                    </>
                  )}
                  {(dayNames[weekDay] === "Ter" || dayNames[weekDay] === "Qua") && (
                    <>
                        <p><strong>{customHours[dayNames[weekDay] + "Noite"] || ""}</strong></p>
                        <p><strong>Local: </strong>{customLocal[dayNames[weekDay] + "Noite"] || ""}</p>
                        <p><strong>Dirigente:</strong></p>
                        <p>{customDriver[dayNames[weekDay] + "Noite"] || ""}</p>
                    </>
                  )}
                </DayBox>
              );
            })}
          </Grid>
        </CalendarContainer>
      </Container>
    </Body>
  );
};

const Body = styled.div`
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 80%;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px 20px;
  border: 1px solid: #83c087;
  border-radius: 10px;
  font-size: 24px;
`;

const Annotations = styled.div`
  background-color:#83c087;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 5px;
  border: 1px solid #83c087;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 18px;
`

const CalendarContainer = styled.div`
  padding: 5px;
  width: 90vw;
  height: 75vh;
  border: 2px solid #83c087;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
`;

const Day = styled.div`
  font-weight: bold;
  padding: 10px;
  background-color: #83c087;
  border-radius: 8px;
`;

const DayBox = styled.div`
  padding: 8px;
  border: 2px solid #83c087;
  border-radius: 5px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  & span{
    margin-bottom: 10px;
    border: 1px solid #000000;
    width: 30px;
    border-radius: 5px;
    position: relative;
    left: -100px;
  }
  & p {
    font-size: 16px;
    font-weight: normal;
    position: relative;
    top: -30px;
  }
`;

const SelectSaturday = styled.select`
    border-radius: 5px;
    height: 25px;
    text-align: center;
    position: relative;
    top: -20px;
    font-size: 16px;
    font-weight: bold;
    width: 70%;
    background-color: #83c087;
`
const SelectTuesday = styled.select`
    border-radius: 5px;
    height: 25px;
    text-align: center;
    position: relative;
    top: -28px;
    font-size: 16px;
    font-weight: bold;
    width: 70%;
    background-color: #83c087;
`