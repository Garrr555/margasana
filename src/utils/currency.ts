const convertIDR = (value: number | any) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value)
}

export {convertIDR};