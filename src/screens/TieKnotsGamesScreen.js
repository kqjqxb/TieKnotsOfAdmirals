import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import admiralQuestionsData from '../components/admiralQuestionsData';
import admiralFindTheKnotData from '../components/admiralFindTheKnotData';

const fontSFProTextRegular = 'SFProText-Regular';

const games = [
  {
    id: 1,
    title: 'Knots quiz',
    image: require('../assets/images/knotsQuiz.png'),
  },
  {
    id: 2,
    title: 'Find the knot',
    image: require('../assets/images/findTheKnot.png'),
  }
]

const TieKnotsGamesScreen = ({ setSelectedTieKnotsScreen, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const [isTieKnotsGameStarted, setIsTieKnotsGameStarted] = useState(false);
  const [tieKnotsAdmiralGameType, setTieKnotsAdmiralGameType] = useState('');
  const [currentTieKnotsQuestionIndex, setCurrentTieKnotsQuestionIndex] = useState(0);
  const [selectedTieKnotsAnswer, setSelectedTieKnotsAnswer] = useState(null);
  const [answerBgColor, setAnswerBgColor] = useState('#fff');
  const [isTieKnotsReplyButtonActive, setIsTieKnotsReplyButtonActive] = useState(true);
  const [correctTieKnotsAnswers, setCorrectTieKnotsAnswers] = useState(0);
  const [wrongTieKnotsAnswers, setWrongTieKnotsAnswers] = useState(0);
  const [tieKnotsBorderColor, setTieKnotsBorderColor] = useState('transparent');

  const handleTieKnotsAnswerSelect = (isCorrect) => {
    setIsTieKnotsReplyButtonActive(false);

    const newTieCorrect = isCorrect ? correctTieKnotsAnswers + 1 : correctTieKnotsAnswers;
    const newTieWrong = !isCorrect ? wrongTieKnotsAnswers + 1 : wrongTieKnotsAnswers;

    if (isCorrect) {
      setCorrectTieKnotsAnswers(newTieCorrect);
      setAnswerBgColor('#F1B900');
    } else {
      setWrongTieKnotsAnswers(newTieWrong);
      setAnswerBgColor('#F92525');
    }

    setTimeout(() => {
      setIsTieKnotsReplyButtonActive(true);
      setSelectedTieKnotsAnswer(null);
      setAnswerBgColor('#fff');
      if (currentTieKnotsQuestionIndex < admiralQuestionsData.length - 1) {
        setCurrentTieKnotsQuestionIndex(prev => prev + 1);
      } else {
        setIsTieKnotsGameStarted(false);
        setTieKnotsAdmiralGameType('');
        Alert.alert(
          'Game over',
          `You have ${newTieCorrect} correct answers and ${newTieWrong} wrong answers`
        );
      }
    }, 500);
  };

  const handleKnotChoose = (isCorrect) => {
    setIsTieKnotsReplyButtonActive(false);

    const newTieCorrect = isCorrect ? correctTieKnotsAnswers + 1 : correctTieKnotsAnswers;
    const newTieWrong = !isCorrect ? wrongTieKnotsAnswers + 1 : wrongTieKnotsAnswers;

    if (isCorrect) {
      setCorrectTieKnotsAnswers(newTieCorrect);
      setTieKnotsBorderColor('#F1B900');
    } else {
      setWrongTieKnotsAnswers(newTieWrong);
      setTieKnotsBorderColor('#F92525');
    }

    setTimeout(() => {
      setIsTieKnotsReplyButtonActive(true);
      setSelectedTieKnotsAnswer(null);
      setTieKnotsBorderColor('transparent');
      if (currentTieKnotsQuestionIndex < admiralFindTheKnotData.length - 1) {
        setCurrentTieKnotsQuestionIndex(prev => prev + 1);
      } else {
        setIsTieKnotsGameStarted(false);
        setTieKnotsAdmiralGameType('');
        Alert.alert(
          'Game over',
          `You have ${newTieCorrect} correct answers and ${newTieWrong} wrong answers`
        );
      }
    }, 500);
  };

  useEffect(() => {
    if (!isTieKnotsGameStarted) {
      setCurrentTieKnotsQuestionIndex(0);
      setSelectedTieKnotsAnswer(null);
      setAnswerBgColor('#fff');
      setIsTieKnotsReplyButtonActive(true);
      setCorrectTieKnotsAnswers(0);
      setWrongTieKnotsAnswers(0);
      setTieKnotsBorderColor('transparent');
    }
  }, [isTieKnotsGameStarted]);

  return (
    <SafeAreaView style={{
      width: dimensions.width,
      paddingHorizontal: dimensions.width * 0.05,
      flex: 1,
    }}>
      <View style={{
        alignItems: 'center',
        marginBottom: dimensions.height * 0.025,
        flexDirection: 'row',
        paddingHorizontal: dimensions.width * 0.05,
        width: dimensions.width,
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
      }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',

          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
              marginRight: dimensions.width * 0.043,
            }}
            onPress={() => {
              if (isTieKnotsGameStarted) {
                setTieKnotsBorderColor('transparent');
                setTieKnotsAdmiralGameType('');
                setAnswerBgColor('#fff');
                setCurrentTieKnotsQuestionIndex(0);
                setSelectedTieKnotsAnswer(null);
                setIsTieKnotsGameStarted(false);
                setCorrectTieKnotsAnswers(0);
                setIsTieKnotsReplyButtonActive(true);
                setWrongTieKnotsAnswers(0);

              } else setSelectedTieKnotsScreen('Home');
            }}
          >
            <Image
              source={require('../assets/icons/admiralBackIcon.png')}
              style={{
                width: dimensions.height * 0.05,
                height: dimensions.height * 0.05,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: dimensions.width * 0.059,
              color: '#fff',
              textAlign: 'left',
              fontWeight: 700,
              fontFamily: fontSFProTextRegular,
            }}>
            {isTieKnotsGameStarted ? tieKnotsAdmiralGameType : 'Games'}
          </Text>
        </View>
      </View>

      {!isTieKnotsGameStarted ? (
        games.map((game) => (
          <TouchableOpacity
            key={game.id}
            onPress={() => {
              setTieKnotsAdmiralGameType(game.title);
              setIsTieKnotsGameStarted(true);
            }}
            style={{
              marginBottom: dimensions.height * 0.034,
              alignSelf: 'center',
              width: dimensions.width * 0.9,
            }}>
            <Image
              source={game.image}
              style={{
                borderRadius: dimensions.width * 0.043,
                width: dimensions.width * 0.9,
                height: dimensions.height * 0.25,
              }}
            />
            <Text
              style={{
                color: '#fff',
                marginTop: dimensions.height * 0.014,
                fontFamily: fontSFProTextRegular,
                textAlign: 'left',
                fontSize: dimensions.width * 0.055,
                fontWeight: 700,
              }}>
              {game.title}
            </Text>
          </TouchableOpacity>
        ))
      ) : isTieKnotsGameStarted && tieKnotsAdmiralGameType === 'Knots quiz' ? (
        <View style={{
          alignSelf: 'center',
          width: dimensions.width,
        }}>
          <Image
            source={admiralQuestionsData[currentTieKnotsQuestionIndex].image}
            style={{
              alignSelf: 'center',
              height: dimensions.height * 0.25,
              borderRadius: dimensions.width * 0.043,
              width: dimensions.width * 0.9,
            }}
          />

          <Text
            style={{
              paddingHorizontal: dimensions.width * 0.05,
              color: '#fff',
              fontWeight: 700,
              fontSize: dimensions.width * 0.059,
              fontFamily: fontSFProTextRegular,
              marginTop: dimensions.height * 0.03,
              textAlign: 'left',
            }}>
            {admiralQuestionsData[currentTieKnotsQuestionIndex].question}
          </Text>

          {admiralQuestionsData[currentTieKnotsQuestionIndex].answers.map((answ, index) => (
            <TouchableOpacity
              disabled={!isTieKnotsReplyButtonActive}
              onPress={() => {
                setSelectedTieKnotsAnswer(answ.answer);
                handleTieKnotsAnswerSelect(answ.isCorrect);
              }}
              key={index}
              style={{
                borderRadius: dimensions.width * 0.0331,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: selectedTieKnotsAnswer === answ.answer ? answerBgColor : '#fff',
                alignItems: 'center',
                paddingHorizontal: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.0255,
                width: dimensions.width * 0.9,
                justifyContent: 'center',
                alignSelf: 'center',
                height: dimensions.height * 0.0691,
              }}>
              <Text
                style={{
                  fontSize: dimensions.width * 0.043,
                  fontWeight: 700,
                  fontFamily: fontSFProTextRegular,
                  color: selectedTieKnotsAnswer === answ.answer ? '#fff' : '#000',
                  textShadowRadius: 1,
                  textAlign: 'center',
                }}
              >
                {answ.answer}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : isTieKnotsGameStarted && tieKnotsAdmiralGameType === 'Find the knot' ? (

        <View style={{
          alignSelf: 'center',
          width: dimensions.width,
        }}>
          <View style={{
            width: dimensions.width * 0.9,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}>
            <TouchableOpacity
              disabled={!isTieKnotsReplyButtonActive}
              onPress={() => {
                setSelectedTieKnotsAnswer(admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[0]);
                handleKnotChoose(admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[0].isCorrect);
              }}>
              <Image
                source={admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[0].answerImage}
                style={{
                  borderWidth: selectedTieKnotsAnswer === admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[0] ? dimensions.width * 0.01 : 0,
                  height: dimensions.height * 0.25,
                  width: dimensions.width * 0.4402,
                  borderRadius: dimensions.width * 0.043,
                  borderColor: tieKnotsBorderColor,
                }}
                resizeMode='stretch'
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isTieKnotsReplyButtonActive}
              onPress={() => {
                setSelectedTieKnotsAnswer(admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[1]);
                handleKnotChoose(admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[1].isCorrect);
              }}>
              <Image
                source={admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[1].answerImage}
                style={{
                  borderColor: tieKnotsBorderColor,
                  height: dimensions.height * 0.25,
                  borderWidth: selectedTieKnotsAnswer === admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[1] ? dimensions.width * 0.01 : 0,
                  width: dimensions.width * 0.44,
                  borderRadius: dimensions.width * 0.043,
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={!isTieKnotsReplyButtonActive}
            onPress={() => {
              setSelectedTieKnotsAnswer(admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[2]);
              handleKnotChoose(admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[2].isCorrect);
            }}>
            <Image
              source={admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[2].answerImage}
              style={{
                borderColor: tieKnotsBorderColor,
                height: dimensions.height * 0.39999,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
                width: dimensions.width * 0.8999,
                borderWidth: selectedTieKnotsAnswer === admiralFindTheKnotData[currentTieKnotsQuestionIndex].answers[2] ? dimensions.width * 0.01 : 0,
                borderRadius: dimensions.width * 0.043,
              }}
              resizeMode='stretch'
            />
          </TouchableOpacity>

          <Text
            style={{
              paddingHorizontal: dimensions.width * 0.05,
              marginTop: dimensions.height * 0.03,
              color: '#fff',
              fontSize: dimensions.width * 0.059,
              textAlign: 'left',
              fontWeight: 700,
              fontFamily: fontSFProTextRegular,
            }}>
            {admiralQuestionsData[currentTieKnotsQuestionIndex].question}
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default TieKnotsGamesScreen;
