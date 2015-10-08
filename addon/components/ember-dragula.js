import Ember from 'ember';

export default Ember.Component.extend({
	willInsertElement:function(){
		var options = this.get('config').options || {};
		this.set('drake', window.dragula(options));
		this.set('parent', this);
	},
	didInsertElement:function(){
		this.setEventListeners();
	},
	setEventListeners:function(){
		if(this.get('config').eventList){
			this.get('config').eventList.forEach(function(event){
				this.drake.on(event.name, function(){
					this.sendAction('dragulaEvent', event.name, arguments);
				}.bind(this));
			}.bind(this));
		}
	},
	willDestroyElement:function(){
		this.drake.containers.removeObject(this.element);
		this.drake.destroy();
		this.set('drake', '');
	}
});
