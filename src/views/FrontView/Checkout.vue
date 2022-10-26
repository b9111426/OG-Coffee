<template>
  <div class="container mt-5">
    <div class="row row-cols-3 justify-content-center">
      <div class="col mb-5">
        <form @submit="onSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="請輸入 Email"
            />
            <span class="invalid-feedback"></span>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">姓名</label>
            <input
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              placeholder="請輸入姓名"
            />
            <span class="invalid-feedback"></span>
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">電話</label>
            <input
              id="phone"
              name="電話"
              type="text"
              class="form-control"
              placeholder="請輸入電話"
            />
            <span class="invalid-feedback"></span>
          </div>

          <div class="mb-3">
            <label for="region" class="form-label">地區</label>
            <select id="region" name="地區" class="form-control">
              <option value="">請選擇地區</option>
              <option value="台北市">台北市</option>
              <option value="高雄市">高雄市</option>
            </select>
            <span class="invalid-feedback"></span>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">地址</label>
            <input
              id="address"
              name="地址"
              type="text"
              class="form-control"
              placeholder="請輸入地址"
            />
            <span class="invalid-feedback"></span>
          </div>

          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-body"></div>
          <div class="card-body d-flex">
            <router-link class="btn btn-success w-50 ms-auto" to="/paid"
              >提交訂單</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
