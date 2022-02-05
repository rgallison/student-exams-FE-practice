const style = document.createElement('style');

style.textContent = `
aside {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: 100%;
}

.nav-item {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #c8c8c8;
    cursor: pointer;
}

.dot {
    display: block;
    background: #c8c8c8;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 auto;
}
`;

export default style;