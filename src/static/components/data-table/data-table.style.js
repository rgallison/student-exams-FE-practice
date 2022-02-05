const style = document.createElement('style');

style.textContent = `
.table-label {
    text-transform: capitalize;
    font-size: 20px;
    margin-bottom: 10px;
}

.id {
    text-transform: capitalize;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th {
    text-transform: capitalize;
}

table th,
table td {
    width: 33%;
    border: 1px solid #c8c8c8;
    padding: 5px 40px;
    text-align: left;
}

`;

export default style;