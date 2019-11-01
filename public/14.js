(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LanComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LanComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      network: '',
      dhcp: '',
      interfaces: '',
      ports: '',
      interval: null
    };
  },
  created: function created() {
    var _this = this;

    axios.get('/api/device/interfaceList').then(function (response) {
      return _this.interfaces = response.data;
    });
    axios.get('/api/device/network').then(function (response) {
      return _this.network = response.data;
    });
    axios.get('/api/device/dhcp').then(function (response) {
      return _this.dhcp = response.data;
    });
    axios.get('/api/device/dhcp/ports').then(function (response) {
      return _this.ports = response.data;
    });
  },
  mounted: function mounted() {
    this.loadDataWireless();
    this.interval = setInterval(function () {
      this.loadDataWireless();
    }.bind(this), 60000);
  },
  methods: {
    loadDataWireless: function loadDataWireless() {
      var currentObj = this;
      axios.get('api/device/interfaceList').then(function (response) {
        currentObj.interfaces = response.data;
      })["catch"](function (error) {
        currentObj.globalError = error;
        currentObj.interfaces = '';
        currentObj.interval = false;
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.interval);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LanComponent.vue?vue&type=template&id=431a794f&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LanComponent.vue?vue&type=template&id=431a794f& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "container is-fluid" },
      [
        _c("router-view"),
        _vm._v(" "),
        _c("div", { staticClass: "container is-fluid data" }, [
          _c("div", { staticClass: "columns is-desktop" }, [
            _c("div", { staticClass: "column column_default is-4" }, [
              _c("table", { staticClass: "table table-sm table-hover" }, [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.interfaces, function(port) {
                    return _c("tr", { key: port.id }, [
                      _c("td", [_vm._v(_vm._s(port.interface.name))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(port.interface["mac-address"]))]),
                      _vm._v(" "),
                      _c(
                        "td",
                        _vm._l(port.mon, function(mon) {
                          return port.interface.name === mon.name
                            ? _c("span", { key: mon.id }, [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(mon.rate) +
                                    "\n                                    "
                                )
                              ])
                            : _vm._e()
                        }),
                        0
                      )
                    ])
                  }),
                  0
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "column column_default is-4 column_right" },
              [
                _c("br"),
                _vm._v(" "),
                _c(
                  "table",
                  { staticClass: "table", attrs: { id: "table_dhcp" } },
                  [
                    _c("tbody", [
                      _c("tr", [
                        _vm._m(1),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.network[0].gateway) +
                              "\n                                "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _vm._m(2),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.network[0].address) +
                              "\n                                "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _vm._m(3),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.network[0]["dns-server"]) +
                              "\n                                "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _vm._m(4),
                        _vm._v(" "),
                        _c(
                          "td",
                          _vm._l(_vm.ports, function(port) {
                            return _c(
                              "p",
                              { key: port.id, staticClass: "inline" },
                              [_vm._v(_vm._s(port) + " , ")]
                            )
                          }),
                          0
                        )
                      ])
                    ])
                  ]
                )
              ]
            )
          ])
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Port")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("MAC")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Linková rychlost")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("th", [
      _c("b", [
        _vm._v(
          "\n                                        Brána:\n                                    "
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("th", [
      _c("b", [
        _vm._v(
          "\n                                        Addresní rozsah:\n                                    "
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("th", [
      _c("b", [
        _vm._v(
          "\n                                        DNS:\n                                    "
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("th", [
      _c("b", [
        _vm._v(
          "\n                                        Porty:\n                                    "
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/LanComponent.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/LanComponent.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LanComponent_vue_vue_type_template_id_431a794f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LanComponent.vue?vue&type=template&id=431a794f& */ "./resources/js/components/LanComponent.vue?vue&type=template&id=431a794f&");
/* harmony import */ var _LanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LanComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/LanComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LanComponent_vue_vue_type_template_id_431a794f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LanComponent_vue_vue_type_template_id_431a794f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/LanComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/LanComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/LanComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LanComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LanComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/LanComponent.vue?vue&type=template&id=431a794f&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/LanComponent.vue?vue&type=template&id=431a794f& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LanComponent_vue_vue_type_template_id_431a794f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./LanComponent.vue?vue&type=template&id=431a794f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LanComponent.vue?vue&type=template&id=431a794f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LanComponent_vue_vue_type_template_id_431a794f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LanComponent_vue_vue_type_template_id_431a794f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);