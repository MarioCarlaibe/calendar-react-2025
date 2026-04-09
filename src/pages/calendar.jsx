import React, { useEffect, useMemo, useState } from "react";
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

  const [tuesdayDriversByDay, setTuesdayDriversByDay] = useState({});
  const [saturdayDriversByDay, setSaturdayDriversByDay] = useState({});

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const monthLabel = String(selectedMonth + 1).padStart(2, "0");

  const lastSundayOfMonthLabel = useMemo(() => {
    const lastDateOfMonth = new Date(selectedYear, selectedMonth, daysInMonth);
    const lastSundayDay = daysInMonth - lastDateOfMonth.getDay();
    const dayLabel = String(lastSundayDay).padStart(2, "0");
    return `${dayLabel}/${monthLabel}`;
  }, [daysInMonth, monthLabel, selectedMonth, selectedYear]);

  useEffect(() => {
    setTuesdayDriversByDay({});
    setSaturdayDriversByDay({});
  }, [selectedMonth, selectedYear]);

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
    dirigentePrimario: "Deivid",
    gruposPrimario: "Deivid e Davi",

    localSecundario: "Regina",
    dirigenteSecundario: "Mário",
    gruposSecundario: "Fernando, Silas e Mário",

    visitaSsGrupo: "Deivid",
    visitaSsData: "01/03",

    campanhas: "",
  }

  const driverSaturday = ["Fabiano", "Adeir", "Felipe", "Fernando", "Davi", "Silas", "Luis Costa", "Mário", "Visita", "Congresso", "Assembléia"]

  const driverTuesday = ["Cidinha", "Terezinha", "Edilena", "Rosemeire"]

  const { tuesdayDays, saturdayDays } = useMemo(() => {
    const tuesday = [];
    const saturday = [];

    for (let day = 1; day <= daysInMonth; day += 1) {
      const weekDay = new Date(selectedYear, selectedMonth, day).getDay();
      if (weekDay === 2) tuesday.push(day);
      if (weekDay === 6) saturday.push(day);
    }

    return { tuesdayDays: tuesday, saturdayDays: saturday };
  }, [daysInMonth, selectedMonth, selectedYear]);

  const selectedTuesdayList = useMemo(() => {
    return tuesdayDays
      .map((day) => ({ day, driver: tuesdayDriversByDay[day] }))
      .filter((item) => Boolean(item.driver));
  }, [tuesdayDays, tuesdayDriversByDay]);

  const selectedSaturdayList = useMemo(() => {
    return saturdayDays
      .map((day) => ({ day, driver: saturdayDriversByDay[day] }))
      .filter((item) => Boolean(item.driver));
  }, [saturdayDays, saturdayDriversByDay]);

  return (
    <Body>
      <PhoneViewport>
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
              <strong>{lastSundayOfMonthLabel}:</strong>  &nbsp; Campo Rural com duas saídas
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

            <AssignmentsColumns>
              <AssignmentsColumn>
                <h4>Dirigentes na Terça</h4>
                {selectedTuesdayList.map(({ day, driver }) => (
                  <AssignmentRow key={`ter-${day}`}>
                    <strong>{String(day).padStart(2, "0")}/{monthLabel}:</strong> {driver}
                  </AssignmentRow>
                ))}
              </AssignmentsColumn>
              <AssignmentsColumn>
                <h4>Dirigentes no Sábado</h4>
                {selectedSaturdayList.map(({ day, driver }) => (
                  <AssignmentRow key={`sab-${day}`}>
                    <strong>{String(day).padStart(2, "0")}/{monthLabel}:</strong> {driver}
                  </AssignmentRow>
                ))}
              </AssignmentsColumn>
            </AssignmentsColumns>
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
                const dayOfMonth = i + 1;
                const dayName = dayNames[weekDay];
                const selectedDriver =
                  dayName === "Ter"
                    ? (tuesdayDriversByDay[dayOfMonth] ?? "")
                    : dayName === "Sáb"
                      ? (saturdayDriversByDay[dayOfMonth] ?? "")
                      : (customDriver[dayName] || "");
                return (
                  <DayBox key={i}> <span>{i + 1}</span>
                    <p><strong>{customHours[dayName] || ""}</strong></p>
                    <p><strong>Local: </strong>{customLocal[dayName] || ""}</p>
                    <p><strong>Dirigente:</strong></p>
                    <p>{selectedDriver}</p>
                    {(dayName === "Ter") && (
                      <SelectTuesday
                        value={tuesdayDriversByDay[dayOfMonth] ?? ""}
                        onChange={(e) =>
                          setTuesdayDriversByDay((prev) => ({
                            ...prev,
                            [dayOfMonth]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Selecione</option>
                        {driverTuesday.map((driver) => (
                          <option key={driver} value={driver}>{driver}</option>
                        ))}
                      </SelectTuesday>
                    )}
                    {(dayName === "Sáb") && (
                      <SelectSaturday
                        value={saturdayDriversByDay[dayOfMonth] ?? ""}
                        onChange={(e) =>
                          setSaturdayDriversByDay((prev) => ({
                            ...prev,
                            [dayOfMonth]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Selecione</option>
                        {driverSaturday.map((driver) => (
                          <option key={driver} value={driver}>{driver}</option>
                        ))}
                      </SelectSaturday>
                    )}
                    {(dayName === "Ter" || dayName === "Qua") && (
                      <>
                          <p><strong>{customHours[dayName + "Noite"] || ""}</strong></p>
                          <p><strong>Local: </strong>{customLocal[dayName + "Noite"] || ""}</p>
                          <p><strong>Dirigente:</strong></p>
                          <p>{customDriver[dayName + "Noite"] || ""}</p>
                      </>
                    )}
                  </DayBox>
                );
              })}
            </Grid>
          </CalendarContainer>
        </Container>
      </PhoneViewport>
    </Body>
  );
};

const Body = styled.div`
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  --mono: #4a4a4a;
  --monoText: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 0;
  background-color: #ffffff;
`;

const PhoneViewport = styled.div`
  width: min(100vw, calc(100vh * 9 / 16));
  min-height: min(100vh, calc(100vw * 16 / 9));
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100vw;
    min-height: 100vh;
    height: auto;
  }
`;

const Container = styled.div`
  width: 100%;
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
  width: 90%;
  & h1 {
    font-size: 36px;
  }
`;

const Select = styled.select`
  padding: 8px 20px;
  border: 1px solid var(--mono);
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const Annotations = styled.div`
  background-color: var(--mono);
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  gap: 5px;
  border: 1px solid var(--mono);
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--monoText);
  font-size: 28px;
`

const AssignmentsColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 6px;
  width: 100%;
`;

const AssignmentsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AssignmentRow = styled.p`
  font-size: 30px;
`;

const CalendarContainer = styled.div`
  padding: 5px;
  width: 100%;
  min-height: 75vh;
  height: auto;
  border: 2px solid var(--mono);
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
  background-color: var(--mono);
  color: var(--monoText);
  border-radius: 8px;
`;

const DayBox = styled.div`
  padding: 8px;
  border: 2px solid var(--mono);
  border-radius: 5px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  & span{
    margin-bottom: 10px;
    border: 1px solid #000000;
    width: 25px;
    border-radius: 5px;
  }
  & p {
    font-size: 12px;
    font-weight: normal;
    position: relative;
  }
`;

const SelectSaturday = styled.select`
    border-radius: 5px;
    height: 20px;
    text-align: center;
    position: relative;
    top: 20px;
    font-size: 12px;
    font-weight: bold;
    width: 110%;
  background-color: var(--mono);
  color: var(--monoText);
`
const SelectTuesday = styled.select`
    border-radius: 5px;
    height: 20px;
    margin: 5px 0;
    text-align: center;
    position: relative;
    top: 0px;
    font-size: 12px;
    font-weight: bold;
    width: 110%;
  background-color: var(--mono);
  color: var(--monoText);
`