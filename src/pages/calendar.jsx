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
    Qui: "Meire",
    QuiNoite: "Alex",
    Sex: "Meire",
    Sáb: "Luis Costa",
  };

  const customDriver = {
    Dom: "Sup. do Grupo",
    Seg: "Mauricio Roncari",
    Ter: "Silas",
    TerNoite: "Reginaldo",
    Qua: "Renato",
    Qui: "Reinaldo",
    QuiNoite: "Olecides",
    Sex: "Sebastião",
    Sáb: "",
  };

  const customAnnotations = {
    data: "30/03",

    localPrimario: "Meire",
    dirigentePrimario: "Deivid",
    gruposPrimario: "Deivid, Fernando, Mário",

    localSecundario: "Regina",
    dirigenteSecundario: "Reginaldo",
    gruposSecundario: "Reginaldo, Silas e Ricardo",

    visitaSsGrupo: "Ricardo",
    visitaSsData: "23/03",
  }

  const driverSaturday = ["Fabiano", "Adeir", "Felipe", "Fernando", "Olecides", "Silas", "Luis Costa"]

  return (
    <Body>
      <Container>
        <Controls>
          <h1>Calendário de Serviço</h1>
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
        </Controls>
        <Annotations>
          <p>
            <strong><u>{customAnnotations.data}</u></strong> - Campo Rural com 2 saídas
          </p>
          <p>
            <strong><u>Local:</u> </strong>{customAnnotations.localPrimario} - <strong><u>Dirigente:</u> </strong>
            {customAnnotations.dirigentePrimario}. <strong><u>Grupos:</u></strong> {customAnnotations.gruposPrimario}.
          </p>
          <p>
            <strong><u>Local:</u> </strong>{customAnnotations.localSecundario} - <strong><u>Dirigente:</u> </strong>{customAnnotations.dirigenteSecundario}. <strong><u>Grupos:</u></strong> {customAnnotations.gruposSecundario}.
          </p>
          <p><strong><u>Visita do Superintendente de Serviço:</u></strong> Grupo: {customAnnotations.visitaSsGrupo} - Data: {customAnnotations.visitaSsData}</p>
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
                  {(dayNames[weekDay] === "Sáb") && (
                    <>
                        <SelectSaturday>
                            {driverSaturday.map((driver) => (
                              <option key={driver} value={driver}>{driver}</option>
                            ))}
                        </SelectSaturday>
                    </>
                  )}
                  {(dayNames[weekDay] === "Ter" || dayNames[weekDay] === "Qui") && (
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
  font-weight: 500;
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
  padding: 8px;
  border: 1px solid: #83c087;
  border-radius: 10px;
  font-size: 16px;
`;

const Annotations = styled.div`
  background-color:#83c087;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  border: 1px solid #83c087;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`

const CalendarContainer = styled.div`
  padding: 5px;
  width: 230mm;
  height: 320mm;
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
  font-weight: bold;
  font-size: 18px;
  & span{
    margin-bottom: 10px;
    border: 1px solid #000000;
    width: 30px;
    border-radius: 5px;
  }
  & p {
    font-size: 14px;
    font-weight: normal;
  }
`;

const SelectSaturday = styled.select`
    border-radius: 5px;
    height: 25px;
    margin-top: 10px;
`