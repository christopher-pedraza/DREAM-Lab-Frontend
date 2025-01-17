import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
    CalendarDate,
    isWeekend,
    getLocalTimeZone,
} from "@internationalized/date";
import { useDateFormatter, I18nProvider } from "@react-aria/i18n";

import {
    existsInSessionStorage,
    getFromSessionStorage,
    saveToSessionStorage,
} from "../../../../utils/Storage";

import propTypes from "prop-types";

function FechaFormulario(props) {
    const {
        update,
        setUpdate,
        setFetchFreeHoursAgain,
        fetchFreeHoursAgain,
        freeHours,
    } = props;

    const locale = "es-MX";
    let formatter = useDateFormatter({ dateStyle: "long" });

    // const [minEligibleDate, setMinEligibleDate] = useState(dayjs());
    const [fecha, setFecha] = useState();
    const [fechaIsoString, setFechaIsoString] = useState(
        getFromSessionStorage("fechaIsoString") || ""
    );
    const [horaInicio, setHoraInicio] = useState(
        parseInt(getFromSessionStorage("horaInicio")) || 0
    );
    const [horaInicioIsoString, setHoraInicioIsoString] = useState(
        getFromSessionStorage("horaInicioIsoString") || ""
    );
    const [duration, setDuration] = useState(
        parseInt(getFromSessionStorage("duration")) || 0
    );
    const [isSelectHoursDisabled, setIsSelectHoursDisabled] = useState(true);

    const horaFormatter = (hora) => {
        return hora < 12
            ? `${hora} AM`
            : `${(hora % 13) + Math.trunc(hora / 13)} PM`;
    };

    const getNextAvailableDay = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        while (date.getDay() === 0 || date.getDay() === 6) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    };

    let nextAvailableDate = getNextAvailableDay();

    const isDateUnavailable = (date) => {
        return isWeekend(date, locale);
    };

    useEffect(() => {
        if (existsInSessionStorage("fecha")) {
            const dateFromFecha = new Date(getFromSessionStorage("fecha"));
            const year = dateFromFecha.getFullYear();
            const month = dateFromFecha.getMonth() + 1;
            const day = dateFromFecha.getDate() + 1;
            setFecha(new CalendarDate(year, month, day));
            setFechaIsoString(
                new CalendarDate(year, month, day).toDate().toISOString()
            );
        } else {
            setFecha(
                new CalendarDate(
                    nextAvailableDate.getFullYear(),
                    nextAvailableDate.getMonth() + 1,
                    nextAvailableDate.getDate()
                )
            );
            setFechaIsoString(
                new CalendarDate(
                    nextAvailableDate.getFullYear(),
                    nextAvailableDate.getMonth() + 1,
                    nextAvailableDate.getDate()
                )
                    .toDate()
                    .toISOString()
            );
            setFetchFreeHoursAgain(!fetchFreeHoursAgain);
            setUpdate(!update);
        }
    }, []);

    useEffect(() => {
        if (!!fecha && fecha !== "Invalid Date") {
            console.log(formatter.format(fecha.toDate(getLocalTimeZone())));
            saveToSessionStorage("fecha", fecha);
        }

        if (getFromSessionStorage("fecha")) {
            setFetchFreeHoursAgain(!fetchFreeHoursAgain);
            setIsSelectHoursDisabled(false);
        } else {
            setIsSelectHoursDisabled(true);
        }
    }, [fecha]);

    useEffect(() => {
        if (fechaIsoString) {
            saveToSessionStorage("fechaIsoString", fechaIsoString);
        }
    }, [fechaIsoString]);

    useEffect(() => {
        if (horaInicio) {
            saveToSessionStorage("horaInicio", horaInicio);
        }
    }, [horaInicio]);

    useEffect(() => {
        if (horaInicioIsoString) {
            saveToSessionStorage("horaInicioIsoString", horaInicioIsoString);
        }
    }, [horaInicioIsoString]);

    useEffect(() => {
        if (duration) {
            saveToSessionStorage("duration", duration);
        }
    }, [duration]);

    return (
        <div className="flex flex-col mx-3">
            <p className="text-white">Fecha</p>
            <div data-cy={"selector-fecha"}>
                <I18nProvider locale={locale}>
                    <DatePicker
                        value={fecha}
                        onChange={(newValue) => {
                            try {
                                setFecha(newValue);
                                setFechaIsoString(
                                    newValue.toDate().toISOString()
                                );
                                setUpdate(!update);
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                        isDateUnavailable={isDateUnavailable}
                        aria-label="Selector de fecha"
                        minValue={
                            new CalendarDate(
                                nextAvailableDate.getFullYear(),
                                nextAvailableDate.getMonth() + 1,
                                nextAvailableDate.getDate()
                            )
                        }
                    />
                </I18nProvider>
            </div>

            <p className="text-white mt-6">Hora de inicio</p>
            <div data-cy="selector-hora-inicio-container">            

            <Select
                className="mb-3 "
                aria-label="Hora de inicio"
                selectedKeys={[horaInicio]}
                disabled={isSelectHoursDisabled}
                placeholder="Selecciona una hora"
                data-cy="selector-hora-inicio"
                onSelectionChange={(hora) => {
                    const horaInt = parseInt(hora.anchorKey);
                    setHoraInicio(horaInt);
                    const date = new Date();
                    date.setHours(horaInt - 6);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);

                    setHoraInicioIsoString(date.toISOString());
                    setUpdate(!update);
                }}
            >
                {freeHours.map((hora, index) => (
                    <SelectItem
                        data-cy={`hora-${index}`}
                        key={hora}
                        value={hora}
                        textValue={horaFormatter(hora)}
                    >
                        {horaFormatter(hora)}
                    </SelectItem>
                ))}
            </Select>
            
            </div>

            <p className="text-white mt-3">Duración</p>

            <Select
                className="max-w"
                aria-label="Duración"
                selectedKeys={[duration + (duration == 1 ? " hora" : " horas")]}
                disabled={isSelectHoursDisabled}
                data-cy="selector-duracion"
            >
                {["1 hora", "2 horas", "3 horas", "4 horas"].map((hora, index) => (
                    <SelectItem
                        key={hora}
                        value={hora}
                        data-cy={`duracion-${index}`}
                        onClick={() => {
                            if (hora === "1 hora") setDuration(1);
                            if (hora === "2 horas") setDuration(2);
                            if (hora === "3 horas") setDuration(3);
                            if (hora === "4 horas") setDuration(4);
                            setUpdate(!update);
                        }}
                    >
                        {hora}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}

FechaFormulario.propTypes = {
    update: propTypes.bool,
    setUpdate: propTypes.func,
    setFetchFreeHoursAgain: propTypes.func,
    fetchFreeHoursAgain: propTypes.bool,
    freeHours: propTypes.array,
};

export default FechaFormulario;
