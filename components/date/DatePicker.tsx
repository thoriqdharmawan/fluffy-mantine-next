import { useState } from 'react';
import { DateRangePickerValue, DateRangePicker } from '@mantine/dates'

export default function DatePicker() {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(),
    new Date(),
  ]);

  return (
    <DateRangePicker
      mb="xl"
      locale="id"
      label="Book hotel"
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
      allowSingleDateInRange
    />
  )
}