(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SettingsComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SettingsComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      devices: '',
      port: '',
      dataResponse: '',
      interval: false
    };
  },
  created: function created() {
    var _this = this;

    axios.get('/api/devices/info').then(function (response) {
      return _this.devices = response.data;
    });
  },
  mounted: function mounted() {
    this.loadSysData();
    this.interval = setInterval(function () {
      this.loadSysData();
    }.bind(this), 2000);
  },
  methods: {
    loadSysData: function loadSysData() {
      var currentObj = this;
      axios.get('/api/devices/info').then(function (response) {
        currentObj.devices = response.data;
      })["catch"](function (error) {
        currentObj.devices = '';
        currentObj.interval = false;
      });
    },
    RebootDevice: function RebootDevice() {
      var currentObj = this;
      axios.post('/api/device/reboot', {
        port: this.port
      }).then(function (response) {
        currentObj.dataResponse = response.data;
      })["catch"](function (error) {
        currentObj.port = '';
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.interval);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SettingsComponent.vue?vue&type=template&id=67fba83f&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SettingsComponent.vue?vue&type=template&id=67fba83f& ***!
  \********************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "container is-fluid" }, [
      _c("div", { staticClass: "container is-fluid data" }, [
        _c("div", { staticClass: "columns is-desktop" }, [
          _c("div", { staticClass: "column column_default is-6" }, [
            _c("br"),
            _c("br"),
            _vm._v(" "),
            _c("table", { staticClass: "table table-sm table-hover" }, [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "tbody",
                [
                  _vm._l(_vm.devices.cpe, function(device) {
                    return _c("tr", { key: device.id }, [
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v("Router")
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(device.platform))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(device["board-name"]))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(device.uptime))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _c(
                          "form",
                          {
                            staticClass: "inline_block",
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.RebootDevice(
                                  (_vm.port = device.port)
                                )
                              }
                            }
                          },
                          [_vm._m(1, true)]
                        )
                      ])
                    ])
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.devices.extender, function(extenderDevice) {
                    return _c("tr", { key: extenderDevice.id }, [
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v("Extender")
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(extenderDevice.platform))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(extenderDevice["board-name"]))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(extenderDevice.uptime))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _c(
                          "form",
                          {
                            staticClass: "inline_block",
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.RebootDevice(
                                  (_vm.port = extenderDevice.port)
                                )
                              }
                            }
                          },
                          [_vm._m(2, true)]
                        )
                      ])
                    ])
                  })
                ],
                2
              )
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Zařízení")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Výrobce")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Typ")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Čas od posledního restartu")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Akce")
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
        _c(
          "button",
          { staticClass: "button is-small is-success is-outlined" },
          [_vm._v("Restart")]
        )
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
        _c(
          "button",
          { staticClass: "button is-small is-success is-outlined" },
          [_vm._v("Restart")]
        )
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/SettingsComponent.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/SettingsComponent.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SettingsComponent_vue_vue_type_template_id_67fba83f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsComponent.vue?vue&type=template&id=67fba83f& */ "./resources/js/components/SettingsComponent.vue?vue&type=template&id=67fba83f&");
/* harmony import */ var _SettingsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/SettingsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SettingsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SettingsComponent_vue_vue_type_template_id_67fba83f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SettingsComponent_vue_vue_type_template_id_67fba83f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SettingsComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SettingsComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/SettingsComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SettingsComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SettingsComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SettingsComponent.vue?vue&type=template&id=67fba83f&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/SettingsComponent.vue?vue&type=template&id=67fba83f& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsComponent_vue_vue_type_template_id_67fba83f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./SettingsComponent.vue?vue&type=template&id=67fba83f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SettingsComponent.vue?vue&type=template&id=67fba83f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsComponent_vue_vue_type_template_id_67fba83f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsComponent_vue_vue_type_template_id_67fba83f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);