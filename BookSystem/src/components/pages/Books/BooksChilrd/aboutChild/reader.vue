<template>
  <div class="hello">
    <h4>借阅制度</h4>
    <ul class="lin_34">
      <li>凭本人读者卡/第二代身份证在各阅览室阅览书刊资料，在阅览室、借阅区门口的验证处通过读卡机确认证件的功能有效后，即可入内。</li>
      <li>当第一次借书时，需交押金￥50</li>
      <li>借阅时间为一个月，如若超过一个月未还者信誉分（满分100）就扣10分，当信誉分小于40时，不好意思，你在三个月内暂时无法借书。</li>
      <li>如若超过半年未还书，则押金扣除。信誉积分扣30分。需重新交押金且信誉积分在40以上才能重新借书。</li>
      <li>一次最多只能借五本书</li>
      <li>请遵守借书规则</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'reader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
  /* list-style-type: disc; */
  list-style: disc;
}
</style>
