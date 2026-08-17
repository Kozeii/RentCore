<?php

namespace App\Http\Controllers;

abstract class Controller
{
    
    public function sendResponse(mixed $data = [], string $message = 'Success', int $statusCode = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }
     public function sendError (string $message , mixed $errors = [] , int $statusCode = 400)
    {
        $response= [
            'success' => false,
            'message' => $message,
        ];
    if(!empty($errors)){
        $response['data'] = $errors;

    }

    return response()->json($response, $statusCode);
    }

}
