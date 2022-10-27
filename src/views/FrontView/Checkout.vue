<template>
  <div class="container mt-5">
    <div class="row row-cols-3 justify-content-center">
      <div class="col-lg-8 col-12 mb-5">
        <div class="card mb-3">
          <div class="card-header">選擇付款類型</div>
          <div class="card-body d-flex flex-column">
            <div class="form-check clearfix py-2 border-bottom">
              <input
                class="form-check-input"
                type="radio"
                name="creditCard"
                id="creditCard"
              />
              <label class="form-check-label float-start" for="creditCard">
                信用卡
              </label>
            </div>
            <div class="form-check clearfix py-2 border-bottom">
              <input
                class="form-check-input"
                type="radio"
                name="linePay"
                id="linePay"
                checked
              />
              <label class="form-check-label float-start" for="linePay">
                LINE Pay
              </label>
            </div>
            <div class="form-check clearfix pt-2 pb-4">
              <input
                class="form-check-input"
                type="radio"
                name="googlePay"
                id="googlePay"
                checked
              />
              <label class="form-check-label float-start" for="googlePay">
                Google Pay
              </label>
            </div>

            <div class="form-check clearfix">
              <input type="checkbox" class="form-check-input" id="bill" />
              <label class="form-check-label float-start" for="bill"
                >發票</label
              >
            </div>

            <div class="d-flex align-items-end">
              <label for="uniform-numbers" class="form-label text-nowrap me-2"
                >統一編號:</label
              >
              <input
                type="password"
                class="form-control"
                id="uniform-numbers"
              />
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">填寫外送資料</div>
          <div class="card-body">
            <form @submit="onSubmit">
              <div class="mb-3">
                <label for="email" class="form-label h6">Email</label>
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
                <label for="name" class="form-label h6">取件人姓名</label>
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
                <label for="phone" class="form-label h6">取件人電話</label>
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
                <label for="region" class="form-label h6">外送地區</label>
                <select id="region" name="地區" class="form-control">
                  <option value="" disabled selected class="text-primary">
                    請選擇外送地區
                  </option>
                  <option value="台北市">台北市</option>
                  <option value="高雄市">新北市</option>
                  <option value="高雄市">桃園市</option>
                </select>
                <span class="invalid-feedback"></span>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label h6">外送地址</label>
                <input
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  placeholder="請輸入地址"
                />
                <span class="invalid-feedback"></span>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label h6">訂單備註</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="card">
          <div class="card-header">訂單資訊</div>
          <div class="card-body border-bottom">
            <div class="d-flex">
              <span class="me-auto text-nowrap">送餐至:</span>
              <span class="text-break">新北市中和區圓通路305巷29弄12號</span>
            </div>
          </div>
          <div class="card-body border-bottom">
            <div class="d-flex flex-column align-items-start">
              <p class="me-auto text-nowrap">預計送達時間：</p>
              <span class="text-break" style="font-size: 1rem"
                >2022/10/26 23:50 - 2022/10/27 00:00</span
              >
            </div>
          </div>
          <div class="card-body border-bottom">
            <div class="d-flex flex-column">
              <p class="me-auto">優惠代碼:</p>
              <div class="d-block">
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-primary"
                    type="button"
                    id="button-addon2"
                  >
                    使用
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body border-bottom">
            <div class="my-2 d-flex">
              <span class="me-auto">小結:</span> <span>NT$999</span>
            </div>
            <div class="mb-2 d-flex">
              <span class="me-auto">外送費:</span> <span>NT$999</span>
            </div>
            <div class="mb-4 d-flex align-item-center">
              <strong class="me-auto">總計:</strong>
              <strong class="h4">NT$999</strong>
            </div>
            <button class="btn btn-success w-100" to="/checkout">
              提交訂單
            </button>
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
