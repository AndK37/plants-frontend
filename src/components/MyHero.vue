<script setup></script>
<template>
    <div class="hero">
        <p>Наш магазин предлагает широкий ассортимент высококачественных семян растений, которые помогут вам создать
            идеальный сад или украсить дом зеленью. Мы заботимся о качестве каждого семени, чтобы вы могли
            наслаждаться
            процессом выращивания и гордиться результатами своего труда.</p>
    </div>
</template>
<style scoped>
.hero p {
    font-size: 24px;
    color: var(--font-primary);
    font-weight: bold;
    margin: 0;
    padding: 0;
    max-width: 822px;
    padding-left: 10px;
    padding-right: 10px;
}

.hero {
    margin-left: auto;
    margin-right: auto;
    height: 495px;
    display: flex;
    align-items: center;
}


@media (max-width: 450px) {
    .hero {}
}

@media (min-width: 768px) {
    .hero {
        width: 750px;
    }

}

@media (min-width: 992px) {
    .hero {
        width: 970px;
    }
}

@media (min-width: 1200px) {
    .hero {
        width: 1170px;
    }
}
</style>