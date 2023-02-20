import {FormGroup, FormSelect, FormSelectOption, Grid, GridItem, TextInput} from "@patternfly/react-core";
import {useState} from "react";

export const timeUnits: Map<string, number> = new Map<string, number>([
    ['ms', 1],
    ['s', 1000],
    ['min', 1000 * 60],
    ['hour', 1000 * 3600],
    ['day', 1000 * 3600 * 24],
])

export type TimePeriodSelectProps = {
    initTimeUnit: string,
    initPeriodInputValue: number,
    setTimePeriod: (period: number) => void
}
export const TimePeriodSelect = (props: TimePeriodSelectProps) => {

    const [timeUnit, setTImeUnit] = useState<string>(props.initTimeUnit);
    const [periodInputValue, setPeriodInputValue] = useState<number>(props.initPeriodInputValue);

    function calculateTime(unit: string) {
        const n = timeUnits.get(unit);
        setTImeUnit(unit);

        if (n) {
            props.setTimePeriod(periodInputValue * n);
        }
    }

    return <FormGroup label="Period">
        <Grid>
            <GridItem span={4}>
                <TextInput value={periodInputValue} onChange={setPeriodInputValue} type="number"
                           aria-label="period"/>
            </GridItem>
            <GridItem span={8}>
                <FormSelect
                    id="period-01"
                    name="simple-form-number"
                    value={timeUnit}
                    onChange={calculateTime}>
                    <FormSelectOption key='ms' value='ms' label='Miliseconds' isDisabled={false}/>
                    <FormSelectOption key='s' value='s' label='Seconds' isDisabled={false}/>
                    <FormSelectOption key='min' value='min' label='Minutes' isDisabled={false}/>
                    <FormSelectOption key='hour' value='hour' label='Hours' isDisabled={false}/>
                    <FormSelectOption key='day' value='day' label='Days' isDisabled={false}/>
                </FormSelect>
            </GridItem>
        </Grid>
    </FormGroup>
}