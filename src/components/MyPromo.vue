<script setup>

</script>
<template>
    <div class="promo">
        <div class="left">
            <span>Почему выбирают нас?</span>
            <ul>
                <li>Разнообразие: У нас вы найдете семена цветов, овощей, трав и экзотических растений. От
                    классических сортов до редких находок — каждый найдет что-то для себя.</li>
                <li>Качество: Все наши семена проходят строгий контроль качества, чтобы обеспечить высокую всхожесть
                    и здоровый рост растений.</li>
                <li>Поддержка: Наша команда экспертов готова помочь вам с выбором семян и дать советы по уходу за
                    растениями.</li>
                <li>Удобство: Оформляйте заказы онлайн и получайте семена прямо домой. Мы гарантируем быструю
                    доставку и надежную упаковку.</li>
            </ul>
        </div>
        <div class="right">
            <span>Что мы предлагаем?</span>
            <ul>
                <li>Семена однолетних и многолетних цветов</li>
                <li>Овощные культуры для огорода</li>
                <li>Ароматные травы и специи</li>
                <li>Экзотические растения для коллекционеров</li>
            </ul>
        </div>
        <img src="../assets/tree.png" alt="">
    </div>
    
</template>
<style scoped>
img {
    filter: invert(1);
    width: 635px;
    height: 495px;

    position: absolute;
    bottom: 0;
    right: 0;
}

li,
span {
    color: var(--font-primary);
    font-size: 18;
    font-weight: bold;
}

.promo {
    position: relative;
    max-width: 1109px;
    height: 656px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.left {
    justify-self: start;
}

.right {
    justify-self: end;
}

@media (max-width: 768px) {
    .promo {
        grid-template-columns: 1fr;
        grid-template-rows: min-content min-content;
        height: fit-content;
    }

    .left,
    .right {
        justify-self: start;
    }
    img {
        display: none;
    }
}
</style>