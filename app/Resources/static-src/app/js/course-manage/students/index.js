import notify from 'common/notify';

class Students {
  constructor() {
    this.initTooltips();
    this.initDeleteActions();
    this.initFollowActions();
    this.initExportActions();
  }

  initTooltips() {
    $("#refund-coin-tips").popover({
      html: true,
      trigger: 'hover',//'hover','click'
      placement: 'left',//'bottom',
      content: $("#refund-coin-tips-html").html()
    });
  }

  initDeleteActions() {
    $('body').on('click', '.js-remove-student', function(evt) {
      if (!confirm(Translator.trans('course.manage.student_delete_hint'))) {
        return;
      }
      $.post($(evt.target).data('url'), function (data) {
        if (data.success) {
          notify('success', Translator.trans('site.delete_success_hint'));
          location.reload();
        } else {
          notify('danger', Translator.trans('site.delete_fail_hint') + ':' + data.message);
        }
      });
    });
  }

  initFollowActions() {
    $("#course-student-list").on('click', '.follow-student-btn, .unfollow-student-btn', function () {
      let $this = $(this);
      $.post($this.data('url'), function () {
        $this.hide();
        if ($this.hasClass('follow-student-btn')) {
          $this.parent().find('.unfollow-student-btn').show();
          notify('success', Translator.trans('user.follow_success_hint'));
        } else {
          $this.parent().find('.follow-student-btn').show();
          notify('success', Translator.trans('user.unfollow_success_hint'));
        }
      });

    });
  }

  initExportActions() {
    $('#export-students-btn').on('click',  function () {
      $(this).button('loading');
      let self = $(this);
      $.get($(this).data('datasUrl'), { start: 0 },  (response)=> {
        if (response.status === 'getData') {
          this.exportStudents(response.start, response.fileName);
        } else {
          self.button('reset');
          location.href = self.data('url') + '?fileName=' + response.fileName;
        }
      });
    });
  }

  exportStudents(start, fileName) {
    var start = start || 0,
      fileName = fileName || '';

    $.get($('#export-students-btn').data('datasUrl'), { start: start, fileName: fileName }, function (response) {
      if (response.status === 'getData') {
        exportStudents(response.start, response.fileName);
      } else {
        $('#export-students-btn').button('reset');
        location.href = $('#export-students-btn').data('url') + '&fileName=' + response.fileName;
      }
    });
  }
}

new Students();