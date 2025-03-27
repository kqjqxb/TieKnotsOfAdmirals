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

const TieKnotsGamesScreen = ({ setSelectedAdmiralScreen, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedGame, setSelectedGame] = useState(null);
  const [isAdmiralGameStarted, setIsAdmiralGameStarted] = useState(false);
  const [admiralGameType, setAdmiralGameType] = useState('');
  const [currentAdmiralQuestionIndex, setCurrentAdmiralQuestionIndex] = useState(0);
  const [selectedAdmiralAnswer, setSelectedAdmiralAnswer] = useState(null);
  const [answerBgColor, setAnswerBgColor] = useState('white');
  const [isReplyButtonActive, setIsReplyButtonActive] = useState(true);
  const [correctAdmiralAnswers, setCorrectAdmiralAnswers] = useState(0);
  const [wrongAdmiralAnswers, setWrongAdmiralAnswers] = useState(0);
  const [admiralBorderColor, setAdmiralBorderColor] = useState('transparent');

  const handleAnswerSelect = (isCorrect) => {
    setIsReplyButtonActive(false);

    const newCorrect = isCorrect ? correctAdmiralAnswers + 1 : correctAdmiralAnswers;
    const newWrong = !isCorrect ? wrongAdmiralAnswers + 1 : wrongAdmiralAnswers;

    if (isCorrect) {
      setCorrectAdmiralAnswers(newCorrect);
      setAnswerBgColor('#F1B900');
    } else {
      setWrongAdmiralAnswers(newWrong);
      setAnswerBgColor('#F92525');
    }

    setTimeout(() => {
      setIsReplyButtonActive(true);
      setSelectedAdmiralAnswer(null);
      setAnswerBgColor('white');
      if (currentAdmiralQuestionIndex < admiralQuestionsData.length - 1) {
        setCurrentAdmiralQuestionIndex(prev => prev + 1);
      } else {
        setIsAdmiralGameStarted(false);
        setAdmiralGameType('');
        Alert.alert(
          'Game over',
          `You have ${newCorrect} correct answers and ${newWrong} wrong answers`
        );
      }
    }, 500);
  };

  const handleKnotChoose = (isCorrect) => {
    setIsReplyButtonActive(false);

    const newCorrect = isCorrect ? correctAdmiralAnswers + 1 : correctAdmiralAnswers;
    const newWrong = !isCorrect ? wrongAdmiralAnswers + 1 : wrongAdmiralAnswers;

    if (isCorrect) {
      setCorrectAdmiralAnswers(newCorrect);
      setAdmiralBorderColor('#F1B900');
    } else {
      setWrongAdmiralAnswers(newWrong);
      setAdmiralBorderColor('#F92525');
    }

    setTimeout(() => {
      setIsReplyButtonActive(true);
      setSelectedAdmiralAnswer(null);
      setAdmiralBorderColor('transparent');
      if (currentAdmiralQuestionIndex < admiralFindTheKnotData.length - 1) {
        setCurrentAdmiralQuestionIndex(prev => prev + 1);
      } else {
        setIsAdmiralGameStarted(false);
        setAdmiralGameType('');
        Alert.alert(
          'Game over',
          `You have ${newCorrect} correct answers and ${newWrong} wrong answers`
        );
      }
    }, 500);
  };

  useEffect(() => {
    if(!isAdmiralGameStarted) {
      setCurrentAdmiralQuestionIndex(0);
      setSelectedAdmiralAnswer(null);
      setAnswerBgColor('white');
      setIsReplyButtonActive(true);
      setCorrectAdmiralAnswers(0);
      setWrongAdmiralAnswers(0);
      setAdmiralBorderColor('transparent');
    }
  }, [isAdmiralGameStarted]);

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal: dimensions.width * 0.05,
      width: dimensions.width,
    }}>
      <View style={{
        width: dimensions.width,
        alignSelf: 'flex-start',
        marginBottom: dimensions.height * 0.025,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: dimensions.width * 0.05,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <TouchableOpacity style={{
            marginRight: dimensions.width * 0.043,
          }}
            onPress={() => {
              if (isAdmiralGameStarted) {
                setIsAdmiralGameStarted(false);
                setAdmiralGameType('');
                setCurrentAdmiralQuestionIndex(0);
                setSelectedAdmiralAnswer(null);
                setAnswerBgColor('white');
                setIsReplyButtonActive(true);
                setCorrectAdmiralAnswers(0);
                setWrongAdmiralAnswers(0);
                setAdmiralBorderColor('transparent');
                

              } else setSelectedAdmiralScreen('Home');
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
              fontFamily: fontSFProTextRegular,
              color: 'white',
              fontSize: dimensions.width * 0.059,
              textAlign: 'left',
              fontWeight: 700,
            }}>
            {isAdmiralGameStarted ? admiralGameType : 'Games'}
          </Text>
        </View>
      </View>

      {!isAdmiralGameStarted ? (
        games.map((game) => (
          <TouchableOpacity
            key={game.id}
            onPress={() => {
              setSelectedGame(game);
              setAdmiralGameType(game.title);
              setIsAdmiralGameStarted(true);
            }}
            style={{
              width: dimensions.width * 0.9,
              alignSelf: 'center',
              marginBottom: dimensions.height * 0.034,
            }}>
            <Image
              source={game.image}
              style={{
                width: dimensions.width * 0.9,
                height: dimensions.height * 0.25,
                borderRadius: dimensions.width * 0.043,
              }}
            />
            <Text
              style={{
                fontFamily: fontSFProTextRegular,
                color: 'white',
                fontSize: dimensions.width * 0.055,
                textAlign: 'left',
                fontWeight: 700,
                marginTop: dimensions.height * 0.014,
              }}>
              {game.title}
            </Text>
          </TouchableOpacity>
        ))
      ) : isAdmiralGameStarted && admiralGameType === 'Knots quiz' ? (
        <View style={{
          alignSelf: 'center',
          width: dimensions.width,
        }}>
          <Image
            source={admiralQuestionsData[currentAdmiralQuestionIndex].image}
            style={{
              width: dimensions.width * 0.9,
              height: dimensions.height * 0.25,
              borderRadius: dimensions.width * 0.043,
              alignSelf: 'center',

            }}
          />

          <Text
            style={{
              fontFamily: fontSFProTextRegular,
              color: 'white',
              fontSize: dimensions.width * 0.059,
              textAlign: 'left',
              fontWeight: 700,
              marginTop: dimensions.height * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
            }}>
            {admiralQuestionsData[currentAdmiralQuestionIndex].question}
          </Text>

          {admiralQuestionsData[currentAdmiralQuestionIndex].answers.map((answ, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedAdmiralAnswer(answ.answer);
                handleAnswerSelect(answ.isCorrect);
              }}
              key={index}
              style={{
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedAdmiralAnswer === answ.answer ? answerBgColor : 'white',
                borderRadius: dimensions.width * 0.0331,
                paddingHorizontal: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.0255,
                flexDirection: 'row',
                justifyContent: 'center',
                height: dimensions.height * 0.07,
              }}>
              <Text
                style={{
                  fontSize: dimensions.width * 0.043,
                  fontFamily: fontSFProTextRegular,
                  color: selectedAdmiralAnswer === answ.answer ? 'white' : 'black',
                  textShadowRadius: 1,
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {answ.answer}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : isAdmiralGameStarted && admiralGameType === 'Find the knot' ? (

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
            <TouchableOpacity onPress={() => {
              setSelectedAdmiralAnswer(admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[0]);
              handleKnotChoose(admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[0].isCorrect);
            }}>
              <Image
                source={admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[0].answerImage}
                style={{
                  width: dimensions.width * 0.44,
                  height: dimensions.height * 0.25,
                  borderRadius: dimensions.width * 0.043,
                  borderWidth: selectedAdmiralAnswer === admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[0] ? dimensions.width * 0.01 : 0,
                  borderColor: admiralBorderColor,
                }}
                resizeMode='stretch'
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setSelectedAdmiralAnswer(admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[1]);
              handleKnotChoose(admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[1].isCorrect);
            }}>
              <Image
                source={admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[1].answerImage}
                style={{
                  width: dimensions.width * 0.44,
                  height: dimensions.height * 0.25,
                  borderRadius: dimensions.width * 0.043,
                  borderWidth: selectedAdmiralAnswer === admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[1] ? dimensions.width * 0.01 : 0,
                  borderColor: admiralBorderColor,
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {
            setSelectedAdmiralAnswer(admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[2]);
            handleKnotChoose(admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[2].isCorrect);
          }}>
            <Image
              source={admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[2].answerImage}
              style={{
                width: dimensions.width * 0.9,
                height: dimensions.height * 0.4,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
                borderRadius: dimensions.width * 0.043,
                borderWidth: selectedAdmiralAnswer === admiralFindTheKnotData[currentAdmiralQuestionIndex].answers[2] ? dimensions.width * 0.01 : 0,
                borderColor: admiralBorderColor,
              }}
              resizeMode='stretch'
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: fontSFProTextRegular,
              color: 'white',
              fontSize: dimensions.width * 0.059,
              textAlign: 'left',
              fontWeight: 700,
              marginTop: dimensions.height * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
            }}>
            {admiralQuestionsData[currentAdmiralQuestionIndex].question}
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default TieKnotsGamesScreen;
