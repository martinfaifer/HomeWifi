(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ExtenderVisualComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ExtenderVisualComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _data$mounted$methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = (_data$mounted$methods = {
  data: function data() {
    return {
      EditSecurityModal: false,
      EditModal: false,
      extenderPort: false,
      wireless: false,
      registrations: false,
      extenderWireless: false,
      extenderRegistrations: false,
      routerInfo: true,
      extenderInfo: true,
      extenderInfo2: true,
      loading: true,
      content: false,
      popisy: false,
      ssid: '',
      security: '',
      port: false,
      wlanId: '',
      edit: '',
      editSecurity: '',
      intervalExtender: null,
      intervalWlan: null,
      intervalComment: null
    };
  },
  mounted: function mounted() {
    this.loadDataExtenderWireless();
    this.intervalExtender = setInterval(function () {
      this.loadDataExtenderWireless();
    }.bind(this), 30000);
    this.loadDataWireless();
    this.intervalWlan = setInterval(function () {
      this.loadDataWireless();
    }.bind(this), 10000);
    this.loadDataComment();
    this.intervalComment = setInterval(function () {
      this.loadDataComment();
    }.bind(this), 30000);
  },
  methods: {
    loadDataExtenderWireless: function loadDataExtenderWireless() {
      var currentObj = this;
      axios.get('/api/device/extender/registrations').then(function (response) {
        currentObj.extenderRegistrations = response.data;
      })["catch"](function (error) {
        currentObj.globalError = error;
        currentObj.extenderRegistrations = '';
        currentObj.interval = false;
      });
    },
    loadDataWireless: function loadDataWireless() {
      var currentObj = this;
      axios.get('/api/device/wlan/registration').then(function (response) {
        currentObj.registrations = response.data;
      })["catch"](function (error) {
        currentObj.globalError = error;
        currentObj.registrations = '';
        currentObj.interval = false;
      });
    },
    loadDataComment: function loadDataComment() {
      var currentObj = this;
      axios.get('api/device/extender/name').then(function (response) {
        currentObj.popisy = response.data;
      })["catch"](function (error) {
        currentObj.globalError = error;
        currentObj.popisy = '';
        currentObj.interval = false;
      });
    },
    EditWlantModal: function EditWlantModal() {
      var currentObj = this;
      axios.post('/api/device/wlan/getEditData', {
        wlanId: this.wlanId,
        port: this.port
      }).then(function (response) {
        currentObj.edit = response.data;
        currentObj.EditModal = true;
      })["catch"](function (error) {
        currentObj.wlanId = '';
        currentObj.EditModal = false;
      });
    },
    EditWlanSecuritytModal: function EditWlanSecuritytModal() {
      var currentObj = this;
      axios.post('/api/device/wlan/getEditSecurityData', {
        wlanId: this.wlanId,
        port: this.port
      }).then(function (response) {
        currentObj.editSecurity = response.data;
        currentObj.EditSecurityModal = true;
      })["catch"](function (error) {
        currentObj.wlanId = '';
        currentObj.EditSecurityModal = false;
      });
    },
    EditWlan: function EditWlan() {
      var currentObj = this;
      axios.post('/api/device/wlan/edit', {
        wlanId: this.wlanId,
        editSsid: this.ssid,
        port: this.port // editFreq: this.frequency,

      }).then(function (response) {
        currentObj.editResponse = response.data;
        currentObj.wlanId = '', currentObj.port = '', axios.get('api/device/wireless').then(function (response) {
          return currentObj.wireless = response.data;
        });
        axios.get('/api/device/extender/wlans').then(function (response) {
          return currentObj.extenderWireless = response.data;
        });
      })["catch"](function (error) {
        currentObj.wlanId = '';
        currentObj.editSsid = '', currentObj.port = '', currentObj.EditModal = false;
      });
    },
    EditSecurityWlan: function EditSecurityWlan() {
      var currentObj = this;
      axios.post('/api/device/wlan/security/edit', {
        wlanId: this.wlanId,
        security: this.security,
        port: this.port
      }).then(function (response) {
        currentObj.editSecurityResponse = response.data;
        axios.get('api/device/wireless').then(function (response) {
          return currentObj.wireless = response.data;
        });
        axios.get('/api/device/extender/wlans').then(function (response) {
          return currentObj.extenderWireless = response.data;
        });
      })["catch"](function (error) {
        currentObj.wlanId = '';
        currentObj.security = '', currentObj.port = '', currentObj.EditModal = false;
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.intervalExtender);
  }
}, _defineProperty(_data$mounted$methods, "beforeDestroy", function beforeDestroy() {
  clearInterval(this.intervalWlan);
}), _defineProperty(_data$mounted$methods, "beforeDestroy", function beforeDestroy() {
  clearInterval(this.intervalComment);
}), _defineProperty(_data$mounted$methods, "created", function created() {
  var _this = this;

  // extendery
  axios.get('/api/device/extender/wlans').then(function (response) {
    return _this.extenderWireless = response.data;
  });
  axios.get('/api/device/extender/registrations').then(function (response) {
    return _this.extenderRegistrations = response.data;
  }); // router

  axios.get('api/device/wireless').then(function (response) {
    return _this.wireless = response.data;
  });
  axios.get('/api/device/wlan/registration').then(function (response) {
    return _this.registrations = response.data;
  }); // popisy extenderu

  axios.get('/api/device/extender/name').then(function (response) {
    return _this.popisy = response.data;
  });
}), _data$mounted$methods);

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.wireless.wireless === false
      ? _c(
          "div",
          {
            staticClass:
              "notification is-warning text-center textColor_default bold"
          },
          [_c("strong", [_vm._v("Vaše zařízení není podporováno!")])]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.extenderWireless.extenderStatus === "false"
      ? _c(
          "div",
          {
            staticClass:
              "notification is-warning text-center textColor_default bold"
          },
          [_c("strong", [_vm._v("Nebyl nalezen žádný extender")])]
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "container is-fluid" }, [
      _c(
        "div",
        { staticClass: "data" },
        [
          _vm.wireless.wireless != "false"
            ? _c(
                "div",
                { staticClass: "center inline_block dropdown is-active" },
                [
                  _vm._m(0),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.routerInfo,
                          expression: "routerInfo"
                        }
                      ],
                      staticClass:
                        "custom_menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu",
                      attrs: { role: "menu" }
                    },
                    [
                      _c(
                        "div",
                        [
                          _vm._l(_vm.wireless.wireless, function(routerWlan) {
                            return _c(
                              "div",
                              {
                                key: routerWlan.id,
                                staticClass: "dropdown-item"
                              },
                              [
                                _c("div", { staticClass: "container" }, [
                                  _c("div", { staticClass: "row" }, [
                                    _c("p", { staticClass: "mobileFont" }, [
                                      _vm._v("SSID:"),
                                      _c("strong", [
                                        _vm._v(_vm._s(routerWlan.ssid))
                                      ]),
                                      _vm._v(" | Heslo: "),
                                      _c("strong", [
                                        _vm._v(_vm._s(routerWlan.password))
                                      ])
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "form",
                                      {
                                        staticClass: "inline_form",
                                        on: {
                                          submit: function($event) {
                                            $event.preventDefault()
                                            return _vm.EditWlantModal(
                                              (_vm.wlanId = routerWlan.id),
                                              (_vm.port = false)
                                            )
                                          }
                                        }
                                      },
                                      [_vm._m(1, true)]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "form",
                                      {
                                        staticClass: "inline_form",
                                        on: {
                                          submit: function($event) {
                                            $event.preventDefault()
                                            return _vm.EditWlanSecuritytModal(
                                              (_vm.wlanId = routerWlan.id),
                                              (_vm.port = false)
                                            )
                                          }
                                        }
                                      },
                                      [_vm._m(2, true)]
                                    )
                                  ])
                                ])
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "dropdown-item" }, [
                            _c(
                              "table",
                              {
                                staticClass:
                                  "mobile_table table table-sm table-hover"
                              },
                              [
                                _vm._m(3),
                                _vm._v(" "),
                                _c(
                                  "tbody",
                                  [
                                    !_vm.registrations.registrations.length
                                      ? _c("div", [_vm._m(4)])
                                      : _vm._l(
                                          _vm.registrations.registrations,
                                          function(registration) {
                                            return _c(
                                              "tr",
                                              {
                                                key: registration.id,
                                                staticClass: "mobileFont"
                                              },
                                              [
                                                registration.comment !== "false"
                                                  ? _c("td", [
                                                      _vm._v(
                                                        "\n                                                " +
                                                          _vm._s(
                                                            registration.comment
                                                          ) +
                                                          "\n                                            "
                                                      )
                                                    ])
                                                  : _c("td", [
                                                      _vm._v(
                                                        "\n                                                Zařízení bez popisu\n                                            "
                                                      )
                                                    ]),
                                                _vm._v(" "),
                                                registration.vendor !== "false"
                                                  ? _c("td", [
                                                      _vm._v(
                                                        "\n                                                " +
                                                          _vm._s(
                                                            registration.vendor
                                                          ) +
                                                          "\n                                            "
                                                      )
                                                    ])
                                                  : _c("td", [
                                                      _vm._v(
                                                        "\n                                                Neznámí výrobce\n                                            "
                                                      )
                                                    ]),
                                                _vm._v(" "),
                                                _c(
                                                  "td",
                                                  {
                                                    staticClass: "hide_isMobile"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                                " +
                                                        _vm._s(
                                                          registration.signal
                                                        ) +
                                                        "\n                                            "
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          }
                                        )
                                  ],
                                  2
                                )
                              ]
                            )
                          ])
                        ],
                        2
                      )
                    ]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.extenderWireless.pocet, function(extender) {
            return _c("div", { key: extender.id, staticClass: "extenders" }, [
              extender === "10810"
                ? _c(
                    "div",
                    { staticClass: "right inline_block dropdown is-active" },
                    [
                      _c("div", [
                        _c(
                          "div",
                          { staticClass: "dropdown-trigger" },
                          [
                            _vm._l(_vm.popisy.result, function(popis) {
                              return popis.port === "10810"
                                ? _c("div", { key: popis.id }, [
                                    _c("p", [_vm._v(_vm._s(popis.comment))])
                                  ])
                                : _vm._e()
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "material-icons" }, [
                              _vm._v(
                                "\n                                wifi\n                            "
                              )
                            ])
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm.extenderInfo
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "right-menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu",
                                attrs: { role: "menu" }
                              },
                              [
                                _vm._l(_vm.extenderWireless.wifi, function(
                                  extender
                                ) {
                                  return extender.extenderPort === "10810"
                                    ? _c(
                                        "div",
                                        {
                                          key: extender.id,
                                          staticClass: "dropdown-item"
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "container" },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "row" },
                                                [
                                                  _c(
                                                    "p",
                                                    {
                                                      staticClass: "mobileFont"
                                                    },
                                                    [
                                                      _vm._v("SSID:"),
                                                      _c("strong", [
                                                        _vm._v(
                                                          _vm._s(extender.ssid)
                                                        )
                                                      ]),
                                                      _vm._v(" | Heslo: "),
                                                      _c("strong", [
                                                        _vm._v(
                                                          _vm._s(
                                                            extender.password
                                                          )
                                                        )
                                                      ])
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "form",
                                                    {
                                                      staticClass:
                                                        "inline_form",
                                                      on: {
                                                        submit: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.EditWlantModal(
                                                            (_vm.wlanId =
                                                              extender.id),
                                                            (_vm.port =
                                                              extender.extenderPort)
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._m(5, true)]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "form",
                                                    {
                                                      staticClass:
                                                        "inline_form",
                                                      on: {
                                                        submit: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.EditWlanSecuritytModal(
                                                            (_vm.wlanId =
                                                              extender.id),
                                                            (_vm.port =
                                                              extender.extenderPort)
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._m(6, true)]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "dropdown-item" }, [
                                  _c(
                                    "table",
                                    {
                                      staticClass: "table table-sm table-hover"
                                    },
                                    [
                                      _vm._m(7, true),
                                      _vm._v(" "),
                                      _c(
                                        "tbody",
                                        [
                                          !_vm.extenderRegistrations
                                            .registrations &&
                                          _vm.extenderRegistrations.registration
                                            .extenderPort === "10810"
                                            ? _c("div", [
                                                _c(
                                                  "p",
                                                  {
                                                    staticClass:
                                                      "has-text-danger"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "Nic neni připojeno na bezdrátové síti"
                                                    )
                                                  ]
                                                )
                                              ])
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm._l(
                                            _vm.extenderRegistrations
                                              .registrations,
                                            function(extenderRegistration1) {
                                              return extenderRegistration1.extenderPort ===
                                                "10810"
                                                ? _c(
                                                    "tr",
                                                    {
                                                      key:
                                                        extenderRegistration1.id,
                                                      staticClass: "mobileFont"
                                                    },
                                                    [
                                                      extenderRegistration1.comment !==
                                                      "false"
                                                        ? _c("td", [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  extenderRegistration1.comment
                                                                ) +
                                                                "\n                                            "
                                                            )
                                                          ])
                                                        : _c("td", [
                                                            _vm._v(
                                                              "\n                                                Zařízení bez popisu\n                                            "
                                                            )
                                                          ]),
                                                      _vm._v(" "),
                                                      extenderRegistration1.vendor !==
                                                      "false"
                                                        ? _c("td", [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  extenderRegistration1.vendor
                                                                ) +
                                                                "\n                                            "
                                                            )
                                                          ])
                                                        : _c("td", [
                                                            _vm._v(
                                                              "\n                                               Neznámí výrobce\n                                            "
                                                            )
                                                          ]),
                                                      _vm._v(" "),
                                                      _c(
                                                        "td",
                                                        {
                                                          staticClass:
                                                            "hide_isMobile"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                " +
                                                              _vm._s(
                                                                extenderRegistration1.signal
                                                              ) +
                                                              "\n                                            "
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  )
                                                : _vm._e()
                                            }
                                          )
                                        ],
                                        2
                                      )
                                    ]
                                  )
                                ])
                              ],
                              2
                            )
                          : _vm._e()
                      ])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              extender === "10809"
                ? _c(
                    "div",
                    { staticClass: "middle inline_block dropdown is-active" },
                    [
                      _c("div", [
                        _c(
                          "div",
                          { staticClass: "dropdown-trigger" },
                          [
                            _vm._l(_vm.popisy.result, function(popis) {
                              return popis.port === "10809"
                                ? _c("div", { key: popis.id }, [
                                    _c("p", [_vm._v(_vm._s(popis.comment))])
                                  ])
                                : _vm._e()
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "material-icons" }, [
                              _vm._v(
                                "\n                                wifi\n                            "
                              )
                            ])
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm.extenderInfo2
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "middle-menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu",
                                attrs: { role: "menu" }
                              },
                              [
                                _vm._l(_vm.extenderWireless.wifi, function(
                                  extender2
                                ) {
                                  return extender2.extenderPort === "10809"
                                    ? _c(
                                        "div",
                                        {
                                          key: extender2.id,
                                          staticClass: "dropdown-item"
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "container" },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "row" },
                                                [
                                                  _c(
                                                    "p",
                                                    {
                                                      staticClass: "mobileFont"
                                                    },
                                                    [
                                                      _vm._v("SSID:"),
                                                      _c("strong", [
                                                        _vm._v(
                                                          _vm._s(extender2.ssid)
                                                        )
                                                      ]),
                                                      _vm._v(" | Heslo: "),
                                                      _c("strong", [
                                                        _vm._v(
                                                          _vm._s(
                                                            extender2.password
                                                          )
                                                        )
                                                      ])
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "form",
                                                    {
                                                      staticClass:
                                                        "inline_form",
                                                      on: {
                                                        submit: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.EditWlantModal(
                                                            (_vm.wlanId =
                                                              extender2.id),
                                                            (_vm.port =
                                                              extender2.extenderPort)
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._m(8, true)]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "form",
                                                    {
                                                      staticClass:
                                                        "inline_form",
                                                      on: {
                                                        submit: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.EditWlanSecuritytModal(
                                                            (_vm.wlanId =
                                                              extender2.id),
                                                            (_vm.port =
                                                              extender2.extenderPort)
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._m(9, true)]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "dropdown-item" }, [
                                  _c(
                                    "table",
                                    {
                                      staticClass:
                                        "mobile_table table table-sm table-hover"
                                    },
                                    [
                                      _vm._m(10, true),
                                      _vm._v(" "),
                                      _c(
                                        "tbody",
                                        [
                                          !_vm.extenderRegistrations
                                            .registrations &&
                                          _vm.extenderRegistrations.registration
                                            .extenderPort === "10809"
                                            ? _c("div", [
                                                _c(
                                                  "p",
                                                  {
                                                    staticClass:
                                                      "has-text-danger"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "Nic neni připojeno na bezdrátové síti"
                                                    )
                                                  ]
                                                )
                                              ])
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm._l(
                                            _vm.extenderRegistrations
                                              .registrations,
                                            function(extenderRegistration2) {
                                              return extenderRegistration2.extenderPort ===
                                                "10809"
                                                ? _c(
                                                    "tr",
                                                    {
                                                      key:
                                                        extenderRegistration2.id,
                                                      staticClass: "mobileFont"
                                                    },
                                                    [
                                                      extenderRegistration2.comment !==
                                                      "false"
                                                        ? _c("td", [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  extenderRegistration2.comment
                                                                ) +
                                                                "\n                                            "
                                                            )
                                                          ])
                                                        : _c("td", [
                                                            _vm._v(
                                                              "\n                                                Zařízení bez popisu\n                                            "
                                                            )
                                                          ]),
                                                      _vm._v(" "),
                                                      extenderRegistration2.vendor !==
                                                      "false"
                                                        ? _c("td", [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  extenderRegistration2.vendor
                                                                ) +
                                                                "\n                                            "
                                                            )
                                                          ])
                                                        : _c("td", [
                                                            _vm._v(
                                                              "\n                                                Neznámí výrobce\n                                            "
                                                            )
                                                          ]),
                                                      _vm._v(" "),
                                                      _c(
                                                        "td",
                                                        {
                                                          staticClass:
                                                            "hide_isMobile"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                " +
                                                              _vm._s(
                                                                extenderRegistration2.signal
                                                              ) +
                                                              "\n                                            "
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  )
                                                : _vm._e()
                                            }
                                          )
                                        ],
                                        2
                                      )
                                    ]
                                  )
                                ])
                              ],
                              2
                            )
                          : _vm._e()
                      ])
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              extender === "10808"
                ? _c(
                    "div",
                    { staticClass: "bottom inline_block dropdown is-active" },
                    [
                      _c("div", [
                        _c(
                          "div",
                          { staticClass: "dropdown-trigger" },
                          [
                            _vm._l(_vm.popisy.result, function(popis) {
                              return popis.port === "10808"
                                ? _c("div", { key: popis.id }, [
                                    _c("p", [_vm._v(_vm._s(popis.comment))])
                                  ])
                                : _vm._e()
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "material-icons" }, [
                              _vm._v(
                                "\n                                wifi\n                            "
                              )
                            ])
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm.extenderInfo3
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "bottom-menu shadow-sm p-3 mb-5 bg-white rounded dropdown-menu",
                                attrs: { role: "menu" }
                              },
                              [
                                _vm._l(_vm.extenderWireless.wifi, function(
                                  extender3
                                ) {
                                  return extender3.extenderPort === "10808"
                                    ? _c(
                                        "div",
                                        {
                                          key: extender3.id,
                                          staticClass: "dropdown-item"
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "container" },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "row" },
                                                [
                                                  _c(
                                                    "p",
                                                    {
                                                      staticClass: "mobileFont"
                                                    },
                                                    [
                                                      _vm._v("SSID:"),
                                                      _c("strong", [
                                                        _vm._v(
                                                          _vm._s(extender3.ssid)
                                                        )
                                                      ]),
                                                      _vm._v(" | Heslo: "),
                                                      _c("strong", [
                                                        _vm._v(
                                                          _vm._s(
                                                            extender3.password
                                                          )
                                                        )
                                                      ])
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "form",
                                                    {
                                                      staticClass:
                                                        "inline_form",
                                                      on: {
                                                        submit: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.EditWlantModal(
                                                            (_vm.wlanId =
                                                              extender3.id),
                                                            (_vm.port =
                                                              extender3.extenderPort)
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._m(11, true)]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "form",
                                                    {
                                                      staticClass:
                                                        "inline_form",
                                                      on: {
                                                        submit: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.EditWlanSecuritytModal(
                                                            (_vm.wlanId =
                                                              extender3.id),
                                                            (_vm.port =
                                                              extender3.extenderPort)
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._m(12, true)]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "dropdown-item" }, [
                                  _c(
                                    "table",
                                    {
                                      staticClass:
                                        "mobile_table table table-sm table-hover"
                                    },
                                    [
                                      _vm._m(13, true),
                                      _vm._v(" "),
                                      _c(
                                        "tbody",
                                        [
                                          !_vm.extenderRegistrations
                                            .registrations &&
                                          _vm.extenderRegistrations.registration
                                            .extenderPort === "10808"
                                            ? _c("div", [
                                                _c(
                                                  "p",
                                                  {
                                                    staticClass:
                                                      "has-text-danger"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "Nic neni připojeno na bezdrátové síti"
                                                    )
                                                  ]
                                                )
                                              ])
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm._l(
                                            _vm.extenderRegistrations
                                              .registrations,
                                            function(extenderRegistration3) {
                                              return extenderRegistration3.extenderPort ===
                                                "10808"
                                                ? _c(
                                                    "tr",
                                                    {
                                                      key:
                                                        extenderRegistration3.id,
                                                      staticClass: "mobileFont"
                                                    },
                                                    [
                                                      extenderRegistration3.comment !==
                                                      "false"
                                                        ? _c("td", [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  extenderRegistration3.comment
                                                                ) +
                                                                "\n                                            "
                                                            )
                                                          ])
                                                        : _c("td", [
                                                            _vm._v(
                                                              "\n                                                Zařízení bez popisu\n                                            "
                                                            )
                                                          ]),
                                                      _vm._v(" "),
                                                      extenderRegistration3.vendor !==
                                                      "false"
                                                        ? _c("td", [
                                                            _vm._v(
                                                              "\n                                                " +
                                                                _vm._s(
                                                                  extenderRegistration3.vendor
                                                                ) +
                                                                "\n                                            "
                                                            )
                                                          ])
                                                        : _c("td", [
                                                            _vm._v(
                                                              "\n                                                Neznámí výrobce\n                                            "
                                                            )
                                                          ]),
                                                      _vm._v(" "),
                                                      _c(
                                                        "td",
                                                        {
                                                          staticClass:
                                                            "hide_isMobile"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                " +
                                                              _vm._s(
                                                                extenderRegistration3.signal
                                                              ) +
                                                              "\n                                            "
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  )
                                                : _vm._e()
                                            }
                                          )
                                        ],
                                        2
                                      )
                                    ]
                                  )
                                ])
                              ],
                              2
                            )
                          : _vm._e()
                      ])
                    ]
                  )
                : _vm._e()
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.EditModal,
              expression: "EditModal"
            }
          ]
        },
        [
          _c("div", { staticClass: "modal is-active" }, [
            _c("div", {
              staticClass: "modal-background",
              on: {
                click: function($event) {
                  _vm.EditModal = false
                }
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { id: "modal_grey_m" } },
              _vm._l(_vm.edit, function(wlanEdit) {
                return _c(
                  "div",
                  {
                    key: wlanEdit.id,
                    staticClass: "container rounded",
                    attrs: { id: "modal_grey_m" }
                  },
                  [
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.EditWlan()
                          }
                        }
                      },
                      [
                        _c("div", { staticClass: "form-group" }, [
                          _c("label", { staticClass: "textColor_default" }, [
                            _vm._v("SSID")
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: (_vm.ssid = wlanEdit.ssid),
                                expression: "ssid = wlanEdit.ssid"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text" },
                            domProps: { value: (_vm.ssid = wlanEdit.ssid) },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  (_vm.ssid = wlanEdit),
                                  "ssid",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit" },
                            on: {
                              click: function($event) {
                                _vm.EditModal = false
                              }
                            }
                          },
                          [_vm._v("Změnit")]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("br")
                  ]
                )
              }),
              0
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.EditSecurityModal,
              expression: "EditSecurityModal"
            }
          ]
        },
        [
          _c("div", { staticClass: "modal is-active" }, [
            _c("div", {
              staticClass: "modal-background",
              on: {
                click: function($event) {
                  _vm.EditSecurityModal = false
                }
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { id: "modal_grey_m" } },
              _vm._l(_vm.editSecurity, function(securityEdit) {
                return _c(
                  "div",
                  {
                    key: securityEdit.id,
                    staticClass: "container rounded",
                    attrs: { id: "modal_grey_m" }
                  },
                  [
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "form",
                      {
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.EditSecurityWlan()
                          }
                        }
                      },
                      [
                        _c("div", { staticClass: "form-group" }, [
                          _c("label", { staticClass: "textColor_default" }, [
                            _vm._v("Heslo")
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: (_vm.security =
                                  securityEdit["wpa2-pre-shared-key"]),
                                expression:
                                  "security = securityEdit['wpa2-pre-shared-key']"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text" },
                            domProps: {
                              value: (_vm.security =
                                securityEdit["wpa2-pre-shared-key"])
                            },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  (_vm.security = securityEdit),
                                  "wpa2-pre-shared-key",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit" },
                            on: {
                              click: function($event) {
                                _vm.EditSecurityModal = false
                              }
                            }
                          },
                          [_vm._v("Změnit")]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("br")
                  ]
                )
              }),
              0
            )
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dropdown-trigger" }, [
      _c("i", { staticClass: "material-icons" }, [_vm._v("router")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-info mobileFont" }, [
          _c("i", { staticClass: "fas fa-edit" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-danger mobileFont" }, [
          _c("i", { staticClass: "fas fa-lock" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Popis")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Výrobce")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "hide_isMobile", attrs: { scope: "col" } }, [
          _vm._v("síla signálu")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mobileFont" }, [
      _c("strong", { staticClass: "has-text-danger" }, [
        _vm._v("Nic neni připojeno na bezdrátové síti")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-info mobileFont" }, [
          _c("i", { staticClass: "fas fa-edit" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-danger mobileFont" }, [
          _c("i", { staticClass: "fas fa-lock" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Popis")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Výrobce")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "hide_isMobile", attrs: { scope: "col" } }, [
          _vm._v("síla signálu")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-info mobileFont" }, [
          _c("i", { staticClass: "fas fa-edit" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-danger mobileFont" }, [
          _c("i", { staticClass: "fas fa-lock" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Popis")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Výrobce")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "hide_isMobile", attrs: { scope: "col" } }, [
          _vm._v("síla signálu")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-info mobileFont" }, [
          _c("i", { staticClass: "fas fa-edit" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-sm", attrs: { type: "submit" } },
      [
        _c("span", { staticClass: "icon has-text-danger mobileFont" }, [
          _c("i", { staticClass: "fas fa-lock" })
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Popis")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Výrobce")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "hide_isMobile", attrs: { scope: "col" } }, [
          _vm._v("síla signálu")
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/ExtenderVisualComponent.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/ExtenderVisualComponent.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExtenderVisualComponent_vue_vue_type_template_id_2f3f65bb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb& */ "./resources/js/components/ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb&");
/* harmony import */ var _ExtenderVisualComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtenderVisualComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/ExtenderVisualComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExtenderVisualComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExtenderVisualComponent_vue_vue_type_template_id_2f3f65bb___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ExtenderVisualComponent_vue_vue_type_template_id_2f3f65bb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ExtenderVisualComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ExtenderVisualComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/ExtenderVisualComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtenderVisualComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ExtenderVisualComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ExtenderVisualComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtenderVisualComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtenderVisualComponent_vue_vue_type_template_id_2f3f65bb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ExtenderVisualComponent.vue?vue&type=template&id=2f3f65bb&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtenderVisualComponent_vue_vue_type_template_id_2f3f65bb___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtenderVisualComponent_vue_vue_type_template_id_2f3f65bb___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);