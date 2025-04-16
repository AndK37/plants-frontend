<template>
    <div class="pagination">
        <button><- Назад</button>
        <span>1</span>
        <button>Вперед -></button>
    </div>
</template>
<style scoped>
button, span {
    color: var(--font-primary);
    background-color: rgba(196, 196,196, 0.25);
    font-size: 16px;
    border-radius: 50px;
    border: none;
    padding: 10px;
}
button {
    cursor: pointer;
}
.pagination {
    display: flex;
    justify-content: space-between;
    max-width: 270px;
    margin-left: auto;
    margin-right: auto;
}
</style>