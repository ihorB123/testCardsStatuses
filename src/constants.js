export const ENGINEERING = "Engineering"
export const MACHINE_DOWN = "Machine Down"
export const MAINTANCE = "Maintenance"

export const statusColors = {
    [ENGINEERING]: "green",
    [MACHINE_DOWN]: "red",
    [MAINTANCE]: "orange",
}

export const DEFAULT_COLOR = "grey"

export const statusOptions = [
    { value: ENGINEERING, label: 'Engineering' },
    { value: MACHINE_DOWN, label: 'Machine Down' },
    { value: MAINTANCE, label: 'Maintenance' }
];