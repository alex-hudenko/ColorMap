<?php

/**
 * This is the model class for table "tbl_palettes".
 *
 * The followings are the available columns in table 'tbl_palettes':
 * @property integer $id
 * @property string $colors
 */
class Palette extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Palette the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_palettes';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('colors', 'required'),
			array('colors', 'length', 'max'=>128),
			array('colors', 'unique'),			
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, colors', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'colors' => 'Colors',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('colors',$this->colors,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
	
	public function findRandom()
	{
		$c = new CDbCriteria();
		$c->order = 'RANDOM()';
		return $this->find($c);
	}
}