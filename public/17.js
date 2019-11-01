(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SpeedTestComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SpeedTestComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      speedTest: false,
      loading: false
    };
  },
  methods: {
    SpeedTest: function SpeedTest() {
      this.loading = true;
      var currentObj = this;
      axios.get('/api/device/speedTest').then(function (response) {
        currentObj.speedTest = response.data;
        currentObj.loading = false;
      })["catch"](function (error) {
        currentObj.speedTest = '';
        currentObj.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SpeedTestComponent.vue?vue&type=template&id=dc50c1a2&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SpeedTestComponent.vue?vue&type=template&id=dc50c1a2& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.speedTest.versionErr,
            expression: "speedTest.versionErr"
          }
        ],
        staticClass: "notification is-grape text-center textColor_default bold"
      },
      [_c("strong", [_vm._v("Vaše zařízení není podporováno!")])]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "container is-fluid" }, [
      _c("br"),
      _vm._v(" "),
      _vm.SpeedTest != false
        ? _c("nav", { staticClass: "level" }, [
            _c("div", { staticClass: "level-item has-text-centered" }, [
              _c("div", [
                _c("p", { staticClass: "heading" }, [_vm._v("Latence")]),
                _vm._v(" "),
                _c("p", { staticClass: "title is-4 count" }, [
                  _vm._v(_vm._s(_vm.speedTest.ping))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "level-item has-text-centered" }, [
              _c("div", [
                _c("p", { staticClass: "heading" }, [_vm._v("Download")]),
                _vm._v(" "),
                _c("p", { staticClass: "title is-4 count" }, [
                  _vm._v(_vm._s(_vm.speedTest.download))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "level-item has-text-centered" }, [
              _c("div", [
                _c("p", { staticClass: "heading" }, [_vm._v("Upload")]),
                _vm._v(" "),
                _c("p", { staticClass: "title is-4 count" }, [
                  _vm._v(_vm._s(_vm.speedTest.upload))
                ])
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "center_btn" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-lg btn-outline-success",
            attrs: { type: "button" },
            on: { click: _vm.SpeedTest }
          },
          [
            _vm.loading === true
              ? _c("span", {
                  staticClass: "spinner-border spinner-border-sm",
                  attrs: { role: "status", "aria-hidden": "true" }
                })
              : _vm._e(),
            _vm._v("\n                Spustit Test\n            ")
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/SpeedTestComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/SpeedTestComponent.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SpeedTestComponent_vue_vue_type_template_id_dc50c1a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpeedTestComponent.vue?vue&type=template&id=dc50c1a2& */ "./resources/js/components/SpeedTestComponent.vue?vue&type=template&id=dc50c1a2&");
/* harmony import */ var _SpeedTestComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpeedTestComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/SpeedTestComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SpeedTestComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SpeedTestComponent_vue_vue_type_template_id_dc50c1a2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SpeedTestComponent_vue_vue_type_template_id_dc50c1a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SpeedTestComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SpeedTestComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/SpeedTestComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SpeedTestComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SpeedTestComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SpeedTestComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SpeedTestComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SpeedTestComponent.vue?vue&type=template&id=dc50c1a2&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/SpeedTestComponent.vue?vue&type=template&id=dc50c1a2& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SpeedTestComponent_vue_vue_type_template_id_dc50c1a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./SpeedTestComponent.vue?vue&type=template&id=dc50c1a2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SpeedTestComponent.vue?vue&type=template&id=dc50c1a2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SpeedTestComponent_vue_vue_type_template_id_dc50c1a2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SpeedTestComponent_vue_vue_type_template_id_dc50c1a2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);