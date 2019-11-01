(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LeaseComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LeaseComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      DeleteModal: '',
      EditModal: false,
      leases: '',
      commnet: '',
      edit: '',
      interval: null,
      editResponse: '',
      leaseId: ''
    };
  },
  mounted: function mounted() {
    this.loadDataLeases();
    this.interval = setInterval(function () {
      this.loadDataLeases();
    }.bind(this), 1000);
  },
  methods: {
    loadDataLeases: function loadDataLeases() {
      var currentObj = this;
      axios.get('api/device/leases').then(function (response) {
        currentObj.leases = response.data;
      })["catch"](function (error) {
        currentObj.globalError = error;
        currentObj.leases = '';
        currentObj.interval = false;
      });
    },
    EditCommentModal: function EditCommentModal() {
      var currentObj = this;
      axios.post('/api/device/lease/getEditData', {
        leaseId: this.leaseId
      }).then(function (response) {
        currentObj.edit = response.data;
        currentObj.EditModal = true;
      })["catch"](function (error) {
        currentObj.leaseId = '';
        currentObj.EditModal = false;
      });
    },
    RemoteLeaseModal: function RemoteLeaseModal() {
      var currentObj = this;
      axios.post('/api/device/lease/remove', {
        leaseId: this.leaseId
      }).then(function (response) {
        currentObj.editResponse = response.data;
        currentObj.EditModal = false;
      })["catch"](function (error) {
        currentObj.leaseId = '';
        currentObj.EditModal = false;
      });
    },
    EditComment: function EditComment() {
      var currentObj = this;
      axios.post('/api/device/lease/edit', {
        leaseId: this.leaseId,
        commnet: this.commnet
      }).then(function (response) {
        currentObj.editResponse = response.data;
        currentObj.EditModal = false;
      })["catch"](function (error) {
        currentObj.leaseId = '';
        currentObj.commnet = '', currentObj.EditModal = false;
      });
    }
  },
  created: function created() {
    var _this = this;

    axios.get('api/device/leases').then(function (response) {
      return _this.leases = response.data;
    });
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.interval);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LeaseComponent.vue?vue&type=template&id=6edc456e&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/LeaseComponent.vue?vue&type=template&id=6edc456e& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "container is-fluid" },
        [
          _c("router-view"),
          _vm._v(" "),
          _c(
            "table",
            { staticClass: "table table-sm table-hover" },
            [
              _vm._m(0),
              _vm._v(" "),
              _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [
                _c(
                  "tbody",
                  _vm._l(_vm.leases, function(lease) {
                    return _c("tr", { key: lease.id }, [
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(lease.address))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "hide_isMobile" }, [
                        _vm._v(_vm._s(lease["mac-address"]))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(lease.vendor))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(lease.comment))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "hide_isMobile" }, [
                        _vm._v(_vm._s(lease["last-seen"]))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "mobileFont" }, [
                        _vm._v(_vm._s(lease.status))
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "form",
                          {
                            staticClass: "inline_block",
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.EditCommentModal(
                                  (_vm.leaseId = lease.address)
                                )
                              }
                            }
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-sm",
                                attrs: { type: "submit" },
                                on: {
                                  click: function($event) {
                                    _vm.EditModal = true
                                  }
                                }
                              },
                              [
                                _c(
                                  "span",
                                  { staticClass: "icon has-text-info" },
                                  [_c("i", { staticClass: "fas fa-edit" })]
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "form",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: lease.status === "waiting",
                                expression: "lease.status === 'waiting'"
                              }
                            ],
                            staticClass: "inline_block",
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return _vm.RemoteLeaseModal(
                                  (_vm.leaseId = lease.address)
                                )
                              }
                            }
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-sm",
                                attrs: { type: "submit" }
                              },
                              [
                                _c(
                                  "span",
                                  { staticClass: "icon has-text-danger" },
                                  [_c("i", { staticClass: "fas fa-trash" })]
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    ])
                  }),
                  0
                )
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [
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
                _vm._l(_vm.edit, function(leaseEdit) {
                  return _c(
                    "div",
                    {
                      key: leaseEdit.id,
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
                              return _vm.EditComment()
                            }
                          }
                        },
                        [
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "textColor_default" }, [
                              _vm._v("Změnit popis")
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: (_vm.commnet = leaseEdit.comment),
                                  expression: "commnet = leaseEdit.comment"
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: {
                                value: (_vm.commnet = leaseEdit.comment)
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    (_vm.commnet = leaseEdit),
                                    "comment",
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
        )
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("IP")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "hide_isMobile", attrs: { scope: "col" } }, [
          _vm._v("MAC")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Výrobce")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Popis")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "hide_isMobile", attrs: { scope: "col" } }, [
          _vm._v("Naposledy viděn")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("status")
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "mobileFont", attrs: { scope: "col" } }, [
          _vm._v("Akce")
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/LeaseComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/LeaseComponent.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LeaseComponent_vue_vue_type_template_id_6edc456e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LeaseComponent.vue?vue&type=template&id=6edc456e& */ "./resources/js/components/LeaseComponent.vue?vue&type=template&id=6edc456e&");
/* harmony import */ var _LeaseComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LeaseComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/LeaseComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LeaseComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LeaseComponent_vue_vue_type_template_id_6edc456e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LeaseComponent_vue_vue_type_template_id_6edc456e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/LeaseComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/LeaseComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/LeaseComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaseComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LeaseComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LeaseComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaseComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/LeaseComponent.vue?vue&type=template&id=6edc456e&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/LeaseComponent.vue?vue&type=template&id=6edc456e& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaseComponent_vue_vue_type_template_id_6edc456e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./LeaseComponent.vue?vue&type=template&id=6edc456e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/LeaseComponent.vue?vue&type=template&id=6edc456e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaseComponent_vue_vue_type_template_id_6edc456e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LeaseComponent_vue_vue_type_template_id_6edc456e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);