<script lang='ts' setup>
import { GuildCredit } from 'fanbook-api-node-sdk';

definePageMeta({
  title: '成员荣誉',
  middleware: ['require-bot'],
});

const credit: GuildCredit = {
  authority: {
    icon: 'https://fb-cdn.fanbook.mobi/fanbook/app/files/chatroom/image/ddf60a18da9f51be0255af8a115007ea.png',
    name: '机器人工具',
  },
  slots: [
    [{
      img: 'https://fb-cdn.fanbook.mobi/fanbook/app/files/chatroom/image/643162c237f9fbe8c9c09a5a6b409b77.png',
      value: 'Collaborator',
    }],
    [{
      label: '头衔介绍',
      value: '为项目捉虫和引路的志愿者',
    }],
  ],
  title: {
    img: 'https://fb-cdn.fanbook.mobi/fanbook/app/files/chatroom/image/643162c237f9fbe8c9c09a5a6b409b77.png',
  },
};
</script>

<template>
  <FbCredit :credit='credit' />
</template>
