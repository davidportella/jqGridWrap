/**
 * Created by davidportella on 27-02-14.
 */
;
(function ($, window, undefined) {

    /**
     * Este metodo se ejecuta despues de agregar la funcionalidad
     * al stock de metodos Jquery ($) configura y gatilla init
     *
     * @param elem
     * @param options
     * @constructor
     */
    var JqGridWrap = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);

        if (this.init) {
            this.init(options);
        }
    };

    /**
     * Prototype del objeto JqGridWrap
     * @type {{defaults: {caption: string, datatype: string, viewrecords: boolean, height: number, rowNum: number, cmTemplate: {sortable: boolean}, autowidth: boolean, shrinkToFit: boolean, headertitles: boolean, sortable: boolean}, init: init, getPager: getPager, columnChooser: columnChooser, excelButton: excelButton, extraButtons: extraButtons}}
     */
    JqGridWrap.prototype = {
        defaults     : {
            caption     : "Titulo",
            datatype    : "json",
            viewrecords : true,
            height      : 400,
            rowNum      : 1000000000,
            cmTemplate  : {sortable: false},
            autowidth   : true,
            shrinkToFit : false,
            headertitles: true,
            sortable    : true
        },
        init         : function (options) {
            var grid_options = options.options,
                pager_options = options.pager ?
                    options.pager :
                {edit: false, add: false, del: false, search: false}
                ;

            this.config = $.extend({}, this.defaults, grid_options);
            this.pager = grid_options.pager;
            this.columns = grid_options.columns;

            this.$elem.jqGrid(this.config);

            this.$elem.jqGrid('navGrid', this.pager, pager_options);

        },
        getPager     : function () {
            return pager = this.config.pager;
        },
        columnChooser: function () {
            var pager = this.getPager(),
                that = this
                ;

            this.$elem.jqGrid('navButtonAdd', pager, {
                caption      : "Columnas",
                title        : "Mostrar/ocultar Columnas",
                onClickButton: function () {
                    that.$elem.jqGrid('columnChooser');
                }
            });
            return this.$elem;
        },
        excelButton  : function (args) {
            var pager = this.getPager(),
                that = this,
                defaults = {
                    caption   : "Descargar Excel",
                    buttonicon: "ui-icon-calculator",
                    title     : "Descargar Excel"
                }
                ;

            var config = $.extend({}, defaults, args);
            that.$elem.jqGrid('navButtonAdd', pager, config);

            return this.$elem;
        },
        extraButtons : function (args) {
            var pager = this.getPager(),
                that = this,
                defaults = {
                    position: "last",
                    cursor  : "pointer"
                }
                ;

            $.each(args, function (i, val) {
                var config = $.extend({}, defaults, val);
                that.$elem.jqGrid('navButtonAdd', pager, config);
            });

            return this.$elem;
        }
    };

    /**
     * Se agrega el plugin al stock de jquery
     *
     * En caso de que el llamado se haga a un metodo
     * Caso contrario si es un objeto el que viene
     * Finalmente un mensaje de error
     *
     * @param options
     * @returns {$.fn}
     */
    $.fn.jqGridWrap = function (options) {

        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            var jqGridWrap = this.data('jqGridWrap') ?
                this.data('jqGridWrap') :
                new JqGridWrap(this);

            if (jqGridWrap[options]) {
                jqGridWrap[options].apply(jqGridWrap, args);
            }
        } else if (typeof options == 'object' || !options) {
            this.data('jqGridWrap', new JqGridWrap(this, options));
        } else {
            $.error('Error, parámetro pasado es incorreto');
        }

        return this;
    };

    //window.JqGridWrap = JqGridWrap;

})(jQuery, window);